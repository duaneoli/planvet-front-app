export class ResponsePaginationDTO<T> {
  currentPage: number
  pageSize: number
  totalPages: number
  totalElements: number
  data: T | T[]

  constructor(data: T[], totalElements: number, page: number, pageSize: number) {
    this.data = data
    this.currentPage = page
    this.pageSize = pageSize
    this.totalPages = Math.ceil(totalElements / pageSize)
    this.totalElements = totalElements
  }
}
