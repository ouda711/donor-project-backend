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
// eslint-disable-next-line import/no-duplicates
import db from '@/database';
// eslint-disable-next-line import/no-duplicates
import sequelize from '@/database';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { Op } from 'sequelize';
import AppResponseDto from '@/dtos/responses/app.response.dto';
import ProjectRequestDto from '@/dtos/requests/project.request.dto';
import ProjectResponseDto from '@/dtos/responses/project.response.dto';
import PageMetaResponseDto from '@/dtos/responses/page.meta.response.dto';

// exports.createProject = async (req, res) => {
//   const bindingResult = ProjectRequestDto.createProjectRequestDto(req);
//   const promises = [];
//   if (!_.isEmpty(bindingResult.errors)) {
//     return res.json(AppResponseDto.buildWithErrorMessages(bindingResult.errors));
//   }
//   let transac;
//   await sequelize.transaction({ autocommit: false }).then(async (transaction) => {
//     transac = transaction;
//     const categories = req.body.categories || [];
//     const points = req.body.points || [];
//     const members = req.body.members || [];
//
//     console.log(categories);
//     // another way of doing it without lodash
//     Object.keys(categories).forEach((name) => {
//       promises.push(db.models.category.findOrCreate({
//         where: { name },
//         defaults: { description: categories[name] },
//       }));
//     });
//
//     Object.keys(points).forEach((name) => {
//       promises.push(db.models.point.findOrCreate({
//         where: { name },
//       }));
//     });
//
//     // Object.keys(points).forEach((id) => {
//     //   promises.push(db.models.point.findOne({
//     //     where: { id },
//     //   }));
//     // });
//     promises.push(db.models.project.create(bindingResult.validatedData, { transaction }));
//     await Promise.all(promises).then(async (results) => {
//       promises.length = 0;
//       const product = results.pop();
//       const categories = [];
//       const points = [];
//       const members = [];
//       results.forEach((result) => {
//         if (result[0]._modelOptions.name.plural === 'categories') {
//           categories.push(result[0]);
//         } else if (result[0]._modelOptions.name.plural === 'points') {
//           points.push(result[0]);
//         } else if (result[0]._modelOptions.name.plural === 'members') {
//           members.push(result[0]);
//         }
//       });
//
//       promises.push(product.setCategories(categories, { transaction }));
//       promises.push(product.setPoints(points, { transaction }));
//       promises.push(product.setMembers(members, { transaction }));
//
//       for (let i = 0; req.files != null && i < req.files.length; i++) {
//         const file = req.files[i];
//         let filePath = file.path.replace(new RegExp('\\\\', 'g'), '/');
//         filePath = filePath.replace('public', '');
//         promises.push(db.models.projectFile.create({
//           fileName: file.filename,
//           filePath,
//           originalName: file.originalname,
//           fileSize: file.size,
//           productId: product.id,
//         }, { transaction }));
//       }
//
//       await Promise.all(promises).then((results) => {
//         const images = _.takeRightWhile(results, (result) => result.constructor.getTableName && result.constructor.getTableName() === 'projectFiles');
//         product.images = images;
//         product.categories = categories;
//         product.points = points;
//         product.members = members;
//         transaction.commit();
//         return res.json(AppResponseDto.buildWithDtoAndMessages(ProjectResponseDto.buildDto(product), 'project created successfully'));
//       }).catch((err) => {
//         console.error(err);
//         return res.json(AppResponseDto.buildWithErrorMessages(err));
//       });
//     }).catch((err) => {
//       console.error(err);
//       return res.json(AppResponseDto.buildWithErrorMessages(err));
//     });
//   }).catch((err) => {
//     console.log(err);
//     transac.rollback();
//     return res.json(AppResponseDto.buildWithErrorMessages(err));
//   });
// };

// exports.createProject = async (req, res) => {
//   const bindingResult = ProjectRequestDto.createProjectRequestDto(req);
//
//   if (!_.isEmpty(bindingResult.errors)) {
//     return res.json(AppResponseDto.buildWithErrorMessages(bindingResult.errors));
//   }
//
//   let transaction;
//   try {
//     transaction = await sequelize.transaction();
//
//     const categories = req.body.categories || [];
//     const points = req.body.points || [];
//
//     const categoryPromises = Object.keys(categories).map((name) => db.models.category.findOrCreate({
//       where: { name },
//       defaults: { description: categories[name] },
//     }));
//
//     const pointPromises = Object.keys(points).map((name) => db.models.point.findOrCreate({
//       where: { name },
//     }));
//
//     const projectPromise = db.models.project.create(bindingResult.validatedData, { transaction });
//     console.log(projectPromise);
//     const results = await Promise.all([...categoryPromises, ...pointPromises, projectPromise]);
//     console.log(results);
//     const createdProject = results.pop();
//
//     const createdCategories = results.slice(0, categories.length).map((result) => result[0]);
//     const createdPoints = results.slice(categories.length).map((result) => result[0]);
//
//     await Promise.all([
//       createdProject.setCategories(createdCategories, { transaction }),
//       createdProject.setPoints(createdPoints, { transaction }),
//     ]);
//
//     if (req.files) {
//       const filePromises = req.files.map((file) => {
//         const filePath = file.path.replace(/\\/g, '/').replace('public', '');
//         return db.models.projectFile.create({
//           fileName: file.filename,
//           filePath,
//           originalName: file.originalname,
//           fileSize: file.size,
//           projectId: createdProject.id,
//         }, { transaction });
//       });
//       await Promise.all(filePromises);
//     }
//
//     await transaction.commit();
//
//     const projectDto = ProjectResponseDto.buildDto(createdProject);
//     return res.json(AppResponseDto.buildWithDtoAndMessages(projectDto, 'Project created successfully'));
//   } catch (error) {
//     if (transaction) await transaction.rollback();
//     console.error('Error creating project:', error);
//     return res.json(AppResponseDto.buildWithErrorMessages(error.message));
//   }
// };

exports.createProject = async (req, res) => {
  const bindingResult = ProjectRequestDto.createProjectRequestDto(req);

  if (!_.isEmpty(bindingResult.errors)) {
    return res.json(AppResponseDto.buildWithErrorMessages(bindingResult.errors));
  }
  const { id } = req.user;
  bindingResult.validatedData.createdBy = id;

  let transaction;
  try {
    transaction = await sequelize.transaction();

    const categories = req.body.categories || [];
    const points = req.body.points || [];

    const categoryPromises = categories.map((name) => db.models.category.findOrCreate({
      where: { name },
      defaults: { description: categories[name] },
    }));

    const pointPromises = Object.keys(points).map((name) => db.models.point.findOrCreate({
      where: { name },
    }));

    // Exclude projectId and ensure only valid fields are included
    const projectData = {
      name: bindingResult.validatedData.name,
      description: bindingResult.validatedData.description,
      status: bindingResult.validatedData.status,
      color: bindingResult.validatedData.color,
      visibility: bindingResult.validatedData.visibility,
      dueDate: bindingResult.validatedData.dueDate,
      startDate: bindingResult.validatedData.startDate,
      isFree: bindingResult.validatedData.isFree,
      budget: bindingResult.validatedData.budget,
      progress: bindingResult.validatedData.progress,
      usedAmount: bindingResult.validatedData.usedAmount,
      isActive: bindingResult.validatedData.isActive,
      isDeleted: bindingResult.validatedData.isDeleted,
      createdBy: bindingResult.validatedData.createdBy,
      agencyId: bindingResult.validatedData.agencyId,
    };

    const projectPromise = db.models.project.create(projectData, { transaction });

    const results = await Promise.all([...categoryPromises, ...pointPromises, projectPromise]);

    const createdProject = results.pop();

    const createdCategories = results.slice(0, categories.length).map((result) => result[0]);
    const createdPoints = results.slice(categories.length).map((result) => result[0]);

    await Promise.all([
      createdProject.setCategories(createdCategories, { transaction }),
      // createdProject.setPoints(createdPoints, { transaction }),
    ]);

    if (req.files) {
      const filePromises = req.files.map((file) => {
        const filePath = file.path.replace(/\\/g, '/').replace('public', '');
        return db.models.projectFile.create({
          fileName: file.filename,
          filePath,
          originalName: file.originalname,
          fileSize: file.size,
          projectId: createdProject.id,
        }, { transaction });
      });
      await Promise.all(filePromises);
    }

    await transaction.commit();

    // const projectDto = ProjectResponseDto.buildDto(createdProject);
    return res.json(createdProject);
  } catch (error) {
    // if (transaction) await transaction.rollback();
    console.error('Error creating project:', error);
    return res.json(AppResponseDto.buildWithErrorMessages(error.message));
  }
};

exports.getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const projects = await db.models.project.findAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'id', 'name', 'description', 'status', 'color', 'dueDate', 'startDate',
        'isFree', 'budget', 'progress', 'usedAmount', 'isActive', 'isDeleted',
        'createdBy', 'updatedBy', 'deletedBy', 'agencyId', 'createdAt', 'updatedAt', 'deletedAt',
      ],
      include: [
        { model: db.models.category, attributes: ['id', 'name'] },
        { model: db.models.point, attributes: ['id', 'content'] },
        { model: db.models.user },
        { model: db.models.projectFile },
        { model: db.models.agency },
      ],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    const projectsCount = await db.models.project.count();

    const projectIds = projects.map((project) => project.id);
    const comments = await db.models.comment.findAll({
      where: {
        projectId: {
          [Op.in]: projectIds,
        },
      },
      attributes: [
        'projectId',
        [sequelize.fn('COUNT', sequelize.col('id')), 'commentsCount'],
      ],
      group: ['projectId'],
    });

    const commentsMap = comments.reduce((map, comment) => {
      map[comment.projectId] = comment.get('commentsCount');
      return map;
    }, {});

    projects.forEach((project) => {
      project.dataValues.comments_count = commentsMap[project.id] || 0;
    });

    console.log(projects);
    res.json(ProjectResponseDto.buildPagedList(projects, page, pageSize, projectsCount, req.baseUrl));
  } catch (err) {
    console.error(err);
    res.status(400).json(AppResponseDto.buildWithErrorMessages(err.message));
  }
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
      { model: db.models.projectFile },
      { model: db.models.agency },
    ],
  });
  db.models.project.findOne(query).then((product) => {
    res.json(ProjectResponseDto.buildDetails(product, true, false));
  }).catch((err) => res.json(AppResponseDto.buildWithErrorMessages(err.message)));
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
