/* eslint-disable max-len */
/* eslint-disable camelcase */
import PageMetaDto from './page.meta.response.dto';
import CategoryDto from './category.response.dto';
import UserDto from './user.response.dto';
import CommentsDto from './comment.response.dto';
import AgencyDto from './agency.response.dto';

function buildDto(product) {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    status: product.status,
    color: product.color,
    dueDate: product.dueDate,
    startDate: product.startDate,
    isFree: product.isFree,
    budget: product.budget,
    progress: product.progress,
    usedAmount: product.usedAmount,
    isActive: product.isActive,
    isDeleted: product.isDeleted,
    createdBy: UserDto.buildBasicInfo(product.createdBy),
    updatedBy: UserDto.buildBasicInfo(product.updatedBy),
    deletedBy: UserDto.buildBasicInfo(product.deletedBy),
    file_urls: product.files ? product.images.map((image) => image.filePath) : [],
    created_at: product.createdAt,
    updated_at: product.updatedAt,
    ...UserDto.buildDtos(product.users),
    ...CategoryDto.buildDtos(product.categories),
    comments_count: product.comments ? product.comments.length : product.comments_count || 0,
    agency: AgencyDto.buildBasicInfo(product.agency),
  };
}

function buildDtos(products) {
  return {
    projects: products.map((product) => buildDto(product)),
  };
}

function buildPagedList(products, page, pageSize, totalResourcesCount, basePath) {
  return {
    success: true,
    page_meta: PageMetaDto.build(products.length, page, pageSize, totalResourcesCount, basePath),
    ...buildDtos(products),
    // products: products.map(product => product.getJsonSummary())
  };
}

function buildDetails(product, includeCommentUser, includeCommentProductSummary) {
  let product_result = buildDto(product);
  product_result.comments_count = undefined; // remove comments_count, we are going to display all comments anyway
  product_result.description = product.description;
  product_result.likes_count = product.likes_count;
  product_result = { ...product_result, ...CommentsDto.buildDtos(product.comments, includeCommentUser, includeCommentProductSummary) };

  return {
    success: true,
    ...product_result,
  };
}

function buildOnlyForIdAndSlug(product) {
  return { success: true, slug: product.slug, id: product.id };
}

function buildIdSlugNameAndPrice(product) {
  if (product == null) return {};
  return {
    id: product.id,
    name: product.name,
  };
}

module.exports = {
  buildPagedList, buildDtos, buildDetails, buildDto, buildOnlyForIdAndSlug, buildIdSlugNameAndPrice,
};
