export interface ApiResponse<T> {
  data?: T
  error?: string
  total?: number
  page?: number
}