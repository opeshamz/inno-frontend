import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { storageHelper } from "@/utils/storage.util";
import { appConstants } from "@/utils/constants.util";

export const createApiClient = (contentType = "application/json") => {
    const config: AxiosRequestConfig = {
        baseURL: appConstants.apiUrl,

        headers: {
            "Content-Type": contentType,
            Accept: contentType,
            Authorization: storageHelper.hasCookieItem()
                ? `Bearer ${storageHelper.getCookieItem()}`
                : undefined,
        },
        responseType: contentType === "application/pdf" ? "blob" : undefined,
    };

    const client = axios.create(config);

    client.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    client.interceptors.response.use(
        (res) => {
            return Promise.resolve(res);
        },
        (err: Error | AxiosError) => {
           
            if (
                axios.isAxiosError(err) &&
                err?.response &&
                err.response?.status === 401 
            ) {
                storageHelper.clearCookieItem();
                window.location.href = "/auth/login";
            }

            return Promise.reject(err);
        }
    );
    return client;
};
