export interface IApiResponse<T> {
    data: T;
    message: string;
    status: string;
}
export interface IPaginatedResponse<T> {
    data: T;
    current_page: number;
    last_page: number;
    total: number;
}
