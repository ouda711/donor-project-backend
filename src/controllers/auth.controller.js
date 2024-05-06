import createError from 'http-errors';
import db from '@/database';
import _ from 'lodash';
import { Op } from 'sequelize';
import AppResponseDto from '@/dtos/responses/app.response.dto';
import UserResponseDto from '@/dtos/responses/user.response.dto';
import UserRequestDto from '@/dtos/requests/user.request.dto';

/**
 * POST /auth/login
 * Login request
 */
export const login = async (req, res, next) => {
  try {
    const {
      email, password, remoteIp, latitude, longitude, userAgent,
    } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: 'You need a email and password' });
      return;
    }
    // Find user by email address
    const user = await db.models.user.findOne(
      {
        where: { email },
        include: [
          { model: db.models.role, attribute: ['name'] },
        ],
      },
    );
    if (!user) {
      await db.models.loginAudit.create({
        username: email,
        loginTime: new Date(),
        remoteIp,
        latitude,
        longitude,
        status: 'failed',
        userAgent,
      });
      // eslint-disable-next-line consistent-return
      return res.status(400).send(AppResponseDto.buildWithErrorMessages('There is no user with this email address!'));
    }

    // Check user password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      await db.models.loginAudit.create({
        username: email,
        loginTime: new Date(),
        remoteIp,
        latitude,
        longitude,
        status: 'failed',
        userAgent,
      });
      // eslint-disable-next-line consistent-return
      return res.status(400).send(AppResponseDto.buildWithErrorMessages('Incorrect password!'));
    }

    // if (user.isEmailVerified !== true) {
    //   // eslint-disable-next-line consistent-return
    //   return res.status(409).send(AppResponseDto.buildWithErrorMessages('Kindly verify your email first!'));
    // }

    // Generate and return token
    const token = user.generateToken();
    const refreshToken = user.generateToken('2h');
    user.token = token;
    user.refreshToken = refreshToken;

    await db.models.loginAudit.create({
      username: email,
      loginTime: new Date(),
      remoteIp,
      latitude,
      longitude,
      status: 'success',
      userAgent,
    });
    // eslint-disable-next-line consistent-return
    return res.status(200).json(UserResponseDto.loginSuccess(user));
  } catch (err) {
    // eslint-disable-next-line consistent-return
    return next(AppResponseDto.buildWithErrorMessages(err));
  }
};

/**
 * POST /auth/register
 * Register request
 */
// eslint-disable-next-line consistent-return
export const register = async (req, res) => {
  const { body } = req;
  const resultBinding = UserRequestDto.createUserRequestDto(req.body);
  if (!_.isEmpty(resultBinding.errors)) {
    // logger.error(`User registration failed due to validation errors: ${resultBinding.errors}`);
    return res.status(422).json(AppResponseDto.buildWithErrorMessages(resultBinding.errors));
  }

  const { email } = resultBinding.validatedData;
  const { phone } = resultBinding.validatedData;

  db.models.user.findOne({
    where: {
      [Op.or]: [{ email }, { phone }],
    },
    // eslint-disable-next-line consistent-return
  }).then((user) => {
    if (user) {
      const errors = {};
      // If the user exists, return Error
      if (user.phone === body.phone) errors.phone = `Phone number: ${body.phone} is already taken`;

      if (user.email === body.email) errors.email = `Email: ${body.email} is already taken`;

      if (!_.isEmpty(errors)) {
        // logger.error(errors);
        return res.status(403).json(AppResponseDto.buildWithErrorMessages(errors));
      }
    }

    // eslint-disable-next-line no-shadow
    db.models.user.create(resultBinding.validatedData).then((user) => {
      if (user === null) {
        throw user;
      }
      if (user) {
        // Generate and return tokens
        // logger.info(`${req.body.email} registered successfully.`);
        res.json(UserResponseDto.registerDto(user));
      } else console.log('user is empty ...???');
    }).catch((err) =>
      // logger.error(err);
      // eslint-disable-next-line implicit-arrow-linebreak
      res.status(400).send(AppResponseDto.buildWithErrorMessages(err)));
  }).catch((err) =>
    // logger.error(err);
    // eslint-disable-next-line implicit-arrow-linebreak
    res.status(400).send(AppResponseDto.buildWithErrorMessages(err)));
};

/**
 * GET /auth/me
 * Get current user
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    delete req.user.dataValues.password;
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /auth/me
 * Update current user
 */
export const updateCurrentUser = async (req, res, next) => {
  try {
    await req.user.update(req.body, {
      fields: ['firstName', 'lastName', 'email'],
    });
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /auth/me
 * Delete current user
 */
export const deleteCurrentUser = async (req, res, next) => {
  try {
    await req.user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /auth/me/password
 * Update password of current user
 */
export const updatePassword = async (req, res, next) => {
  try {
    const { current, password } = req.body;

    // Check user password
    const isValidPassword = await req.user.validatePassword(current);
    if (!isValidPassword) {
      return next(createError(400, 'Incorrect password!'));
    }

    // Update password
    req.user.password = password;
    await req.user.save();

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};
