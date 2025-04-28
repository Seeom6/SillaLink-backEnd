import { Pagination, IPaginationRequest} from "@Package/api";

export function getPagination(pagination: IPaginationRequest): Pagination {
  pagination.limit = pagination.limit < 0 ? 0 : 30;
  pagination.page = pagination.page < 0 ? 0 : 30;
  return {
    needPagination: pagination.needPagination,
    skip: pagination.page * pagination.limit,
    limit: pagination.limit,
  }
}