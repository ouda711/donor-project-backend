import db from '@/database';
import AppResponseDto from '@/dtos/responses/app.response.dto';

function init(router) {
  // place the product in the request object when :product_id is present in path
  router.param('projectId', (req, res, next) => {
    req.query = { id: req.params.projectId };
    next();
  });

  router.param('projetct_load_ids', async (req, res, next, id) => {
    const query = { attributes: ['id'] };
    query.where = { id };

    await db.models.project.findOne(query)
      .then((product) => {
        if (product) {
          req.project = product;
          req.project_id = product.id;
          return next();
        }
        return res.json(AppResponseDto.buildWithErrorMessages('Project does not exist'), 404);
      }).catch((err) => res.json(AppResponseDto.buildWithErrorMessages(err.message)));
  });
}

module.exports = {
  init,
};
