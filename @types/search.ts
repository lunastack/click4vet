export type Pagination = {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPagination: number;
};

export type SearchResponse<T> = {
  data: T[];
  meta: Pagination;
};
export type SearchFilters = Record<string, any>;