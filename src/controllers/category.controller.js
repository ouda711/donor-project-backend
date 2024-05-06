/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
import db from '@/database';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Op } from 'sequelize';
import AppResponseDto from '@/dtos/responses/app.response.dto';

export const createCategory = async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json(AppResponseDto.buildWithErrorMessages('Provide name and description'));
  }
  const category = await db.models.category.findOne({ where: { name } });
  if (category) {
    return res.status(400).json(AppResponseDto.buildWithErrorMessages('Category already exists'));
  }
  await db.models.category.create({ name, description }).then((category1) => res.status(201).json(AppResponseDto.buildWithDtoAndMessages(category1, 'Category created successfully'))).catch((err) => next(AppResponseDto.buildWithErrorMessages(err)));
};

export const getAllCategories = async (req, res, next) => {
  await db.models.category.findAll().then((categories) => res.status(200).json(AppResponseDto.buildWithDtoAndMessages(categories, 'Categories retrieved successfully'))).catch((err) => next(AppResponseDto.buildWithErrorMessages(err)));
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  await await db.models.category.findByPk(id).then((category) => res.status(200).json(AppResponseDto.buildWithDtoAndMessages(category, 'Category retrieved successfully'))).catch((err) => next(AppResponseDto.buildWithErrorMessages(err)));
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  await db.models.category.update({ name, description }, { where: { id } }).then((category) => res.status(200).json(AppResponseDto.buildWithDtoAndMessages(category, 'Category updated successfully'))).catch((err) => next(AppResponseDto.buildWithErrorMessages(err)));
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  await db.models.category.destroy({ where: { id } }).then(() => res.status(200).json(AppResponseDto.buildWithMessages('Category deleted successfully'))).catch((err) => next(AppResponseDto.buildWithErrorMessages(err)));
};
