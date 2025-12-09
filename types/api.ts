export interface ApiError {
    error: string;
    message: string;
    statusCode: number;
}

export interface LimitResponseDto {
    limit: number | null;
    used: number;
    remaining: number | null;
    message: string;
}