/* eslint-disable no-extra-boolean-cast */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-dupe-keys */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import db from '@/database';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import sequelize, { Op } from 'sequelize';
import AppResponseDto from '@/dtos/responses/app.response.dto';
import ProjectRequestDto from '@/dtos/requests/project.request.dto';
import ProjectResponseDto from '@/dtos/responses/project.response.dto';
import PageMetaResponseDto from '@/dtos/responses/page.meta.response.dto';

exports.createProject = (req, res) => {
  const bindingResult = ProjectRequestDto.createProjectRequestDto(req);
  const promises = [];
  if (!_.isEmpty(bindingResult.errors)) {
    return res.json(AppResponseDto.buildWithErrorMessages(bindingResult.errors));
  }
  let transac;
  sequelize.transaction({ autocommit: false }).then(async (transaction) => {
    transac = transaction;
    const categories = req.body.categories || [];
    const points = req.body.points || [];
    const members = req.body.members || [];
    // another way of doing it without lodash
    Object.keys(categories).forEach((name) => {
      promises.push(db.models.category.findOrCreate({
        where: { name },
        defaults: { description: categories[name] },
      }));
    });

    Object.keys(points).forEach((name) => {
      promises.push(db.models.point.findOrCreate({
        where: { name },
      }));
    });

    // Object.keys(points).forEach((id) => {
    //   promises.push(db.models.point.findOne({
    //     where: { id },
    //   }));
    // });
    promises.push(db.models.project.create(bindingResult.validatedData, { transaction }));
    await Promise.all(promises).then(async (results) => {
      promises.length = 0;
      const product = results.pop();
      const categories = [];
      const points = [];
      const members = [];
      results.forEach((result) => {
        if (result[0]._modelOptions.name.plural === 'categories') {
          categories.push(result[0]);
        } else if (result[0]._modelOptions.name.plural === 'points') {
          points.push(result[0]);
        } else if (result[0]._modelOptions.name.plural === 'members') {
          members.push(result[0]);
        }
      });

      promises.push(product.setCategories(categories, { transaction }));
      promises.push(product.setPoints(points, { transaction }));
      promises.push(product.setMembers(members, { transaction }));

      for (let i = 0; req.files != null && i < req.files.length; i++) {
        const file = req.files[i];
        let filePath = file.path.replace(new RegExp('\\\\', 'g'), '/');
        filePath = filePath.replace('public', '');
        promises.push(db.models.projectFile.create({
          fileName: file.filename,
          filePath,
          originalName: file.originalname,
          fileSize: file.size,
          productId: product.id,
        }, { transaction }));
      }

      await Promise.all(promises).then((results) => {
        const images = _.takeRightWhile(results, (result) => result.constructor.getTableName && result.constructor.getTableName() === 'projectFiles');
        product.images = images;
        product.categories = categories;
        product.points = points;
        product.members = members;
        transaction.commit();
        return res.json(AppResponseDto.buildWithDtoAndMessages(ProjectResponseDto.buildDto(product), 'project created successfully'));
      }).catch((err) => {
        throw err;
      });
    }).catch((err) => {
      throw err;
    });
  }).catch((err) => {
    transac.rollback();
    return res.json(AppResponseDto.buildWithErrorMessages(err));
  });
};

exports.getAll = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  Promise.all([
    db.models.project.findAll({
      offset: 0,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
      ],
      attributes: ['id', 'name', 'description', 'status', 'color', 'dueDate', 'startDate', 'isFree', 'budget', 'progress', 'usedAmount', 'isActive', 'isDeleted', 'createdBy', 'updatedBy', 'deletedBy', 'agencyId', 'createdAt', 'updatedAt', 'deletedAt'],
      include: [
        {
          model: db.models.category,
          attributes: ['id', 'name'],
        },
        {
          model: db.models.point,
          attributes: ['id', 'content'],
        },
        {
          model: db.models.user,
        },
      ],
      // group: ['products.id'],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    }),
    db.models.project.findAndCountAll({ attributes: ['id'] }),
  ])
    .then((results) => {
      const products = results[0];
      const productsCount = results[1].count;
      db.models.comment.findAll({
        where: {
          projectId: {
            [sequelize.Op.in]: products.map((product) => product.id),
          },
        },
        attributes: ['projectId', [sequelize.fn('COUNT', sequelize.col('id')), 'commentsCount']],
        group: 'projectId',
      }).then((results) => {
        products.forEach((product) => {
          const comment = results.find((comment) => product.id === comment.productId);
          if (comment != null) product.comments_count = comment.get('commentsCount');
          else product.comments_count = 0;
        });
        return res.json(ProjectResponseDto.buildPagedList(products, page, pageSize, productsCount, req.baseUrl));
      }).catch((err) => {
        console.error(err);
        res.json(AppResponseDto.buildWithErrorMessages(err.message));
      });
    }).catch((err) => {
      console.error(err);
      res.status(400).send(err.message);
    });
};

exports.getById = (req, res, next) => {
  const query = _.assign(req.query, {
    include: [
      {
        model: db.models.category,
        attributes: ['id', 'name'],
      },
      {
        model: db.models.point,
        attributes: ['id', 'content'],
      },
      {
        model: db.models.user,
      },
    ],
  });

  db.models.project.findOne(req.query).then((product) => res.json(ProjectResponseDto.buildDetails(product, true, false))).catch((err) => res.json(AppResponseDto.buildWithErrorMessages(err.message)));
};

exports.getByCategory = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const offset = (page - 1) * pageSize;

  const categoryQuery = {};
  if (!!req.params.category_slug) {
    categoryQuery.slug = req.params.category_slug;
  } else {
    categoryQuery.id = req.params.categoryId;
  }

  db.models.project.findAndCountAll({
    attributes: ['id', 'name', 'description', 'status', 'color', 'dueDate', 'startDate', 'isFree', 'budget', 'progress', 'usedAmount', 'isActive', 'isDeleted', 'createdBy', 'updatedBy', 'deletedBy', 'agencyId', 'createdAt', 'updatedAt', 'deletedAt'],
    include: [
      {
        model: db.models.category,
        attributes: ['id', 'name'],
      },
      {
        model: db.models.point,
        attributes: ['id', 'content'],
      },
      {
        model: db.models.user,
      },
    ],

    order: [
      ['createdAt', 'DESC'],
      // ['price', 'DESC']
    ],

    offset,
    limit: pageSize,
  }).then((products) => res.json(ProjectResponseDto.buildPagedList(products.rows, page, pageSize, products.count, req.baseUrl))).catch((err) => res.json(AppResponseDto.buildWithErrorMessages(err.message)));
};
