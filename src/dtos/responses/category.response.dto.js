import PageMetaDto from './page.meta.response.dto';

function buildDto(category) {
  const summary = {
    id: category.id,
    name: category.name,
    description: category.description,
  };

  return summary;
}

function buildDtos(categories) {
  if (!categories) return { categories: [] };
  return {
    categories: categories.map((category) => buildDto(category, true)),
  };
}
function buildPagedList(tags, page, pageSize, totalProductsCount, basePath) {
  return {
    success: true,
    page_meta: PageMetaDto.build(tags.length, page, pageSize, totalProductsCount, basePath),
    ...buildDtos(tags),
  };
}

module.exports = {
  buildDtos, buildPagedList, buildDto,
};
