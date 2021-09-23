// @ts-ignore
/* eslint-disable */

declare namespace API {
    type Result<T> = {
        code?: number;
        data: T;
        message?: string;
    }
    type ListResult<T> = {
        code?: number;
        data?: T[];
        message?: string;
    };
}