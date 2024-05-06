/* eslint-disable consistent-return */
import db from '@/database';
import AppResponseDto from '@/dtos/responses/app.response.dto';

function init(router) {
  router.param('comment', (req, res, next, id) => {
    db.models.comment.findOne({
      where: { id },
      include: [{
        model: db.models.user,
      },
      {
        model: db.models.project,
        attributes: ['id', 'name', 'description'],
      }],
    }).then((comment) => {
      if (!comment) { return res.json(AppResponseDto.buildWithErrorMessages('Comment not found'), 404); }

      req.comment = comment;
      return next();
    }).catch((err) => res.json(AppResponseDto.buildWithErrorMessages(`Error ${err}`)));
  });

  router.param('comment_load_ids', (req, res, next, id) => {
    db.models.comment.findOne({
      where: { id },
      attributes: ['projectId', 'userId', 'id'],
    }).then((comment) => {
      if (!comment) {
        return res.json(AppResponseDto.buildWithErrorMessages('Comment not found'), 404);
      }
      req.comment = comment;
      req.userOwnable = comment;
      next();
    }).catch((err) => res.json(AppResponseDto.buildWithErrorMessages(err.message)));
  });
}

module.exports = {
  init,
};
