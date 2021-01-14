/*
 * @Description: axios 定义
 * @Author: Fu Fei
 * @Date: 2020-08-18 09:58:07
 * @LastEditTime: 2020-08-18 09:58:30
 * @LastEditors: Fu Fei
 * @FilePath: \new_page_build\page_build_editor\src\type\axios.d.ts
 */

import "axios";
// https://gaojiajun.cn/2019/12/typescript-axios-interceptor-commondata/

declare module "axios" {
    export interface AxiosInstance {
        <T = any>(config: AxiosRequestConfig): Promise<T>;
        request<T = any>(config: AxiosRequestConfig): Promise<T>;
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        post<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig
        ): Promise<T>;
        put<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig
        ): Promise<T>;
        patch<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig
        ): Promise<T>;
    }
}

declare global {
    namespace Ajax {
        interface Response<T> {
            ErrorMessage: string;
            ErrorCode: number;
            IsSuccess: boolean;
            Data?: T;
        }
    }
}
