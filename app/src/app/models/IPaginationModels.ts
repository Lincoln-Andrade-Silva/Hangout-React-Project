export interface IPagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class IPaginatedResult<T> {
    data: T;
    pagination: IPagination;

    constructor(data: T, pagination: IPagination) {
        this.data = data;
        this.pagination = pagination;
    }
}

export class IPagingParams{
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = 2) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}