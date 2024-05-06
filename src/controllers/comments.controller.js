/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable radix */
import db from '@/database';
import _ from 'lodash';

import CommentRequestDto from '@/dtos/requests/comment.request.dto';
import CommentResponseDto from '@/dtos/responses/comment.response.dto';
import AppResponseDto from '@/dtos/responses/app.response.dto';

exports.getCommentsFromProject = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const offset = (page - 1) * pageSize;

  return db.models.comment.findAndCountAll({
    where: { projectId: req.project_id },
    attributes: ['content'],
    offset,
    limit: pageSize,
    include: [{
      model: db.models.user,
      attributes: ['id', 'firstName', 'lastName', 'email'],
    }],
  }).then((comments) => {
    const commentsCount = comments.count;
    return res.json(CommentResponseDto.buildPagedList(comments.rows, page, pageSize, commentsCount, req.baseUrl, true));
  }).catch((err) => res.json(AppResponseDto.buildSuccessWithMessages(err.message)));
};

exports.createComment = (req, res) => {
  const bindingResult = CommentRequestDto.createCommentDto(req.body);
  if (!_.isEmpty(bindingResult.errors)) {
    return res.json(AppResponseDto.buildWithErrorMessages(bindingResult.errors));
  }

  db.models.comment.create({
    productId: req.product_id,
    userId: req.user.id,
    content: req.body.content,
  }).then((comment) => {
    res.json(CommentResponseDto.buildDetails(comment, false, false));
  }).catch((err) => res.json(AppResponseDto.buildWithErrorMessages(err.message)));
};

exports.deleteComment = (req, res) => {
  req.comment.destroy().then((result) => {
    res.json(AppResponseDto.buildSuccessWithMessages('comment removed successfully'));
  }).catch((err) => res.json(AppResponseDto.buildWithErrorMessages(`Error ${err}`)));
};

exports.getCommentDetails = (req, res) => res.json(CommentResponseDto.buildDetails(req.comment, true, true));
