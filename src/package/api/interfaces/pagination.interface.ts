

export class Pagination {
  limit: number;
  skip: number;
  needPagination?: boolean;
}

export class IPaginationRequest {
  page: number;
  limit: number;
  needPagination?: boolean;
}