export interface IListRequest {
  sortKey?: string;
  sortDirection?: string;
  page?: number;
  limit?: number;
  search?: string;
  filters?: any;
}
