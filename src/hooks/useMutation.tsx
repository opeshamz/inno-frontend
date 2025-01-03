/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */



import { useState } from "react";
import { useQueryClient } from "react-query";
import { Toast } from "@/utils/toast.util";
import axios, { AxiosRequestConfig } from "axios";
import { createApiClient } from "@/services/AxiosConfig";
import { IApiResponse } from "@/interfaces/api.interface";




type IMethod = "delete" | "post" | "put" | "patch" | "get";

export type IUrlParams = Record<string, any>;

interface IMutationProps {
    /** HTTP method for the request (e.g., GET, POST) */
    method: IMethod;
    /** API endpoint or a function to dynamically construct it using `urlParams` */
    url: string | ((params: IUrlParams) => string);
    /** Keys of React Query cache to invalidate after a successful request */
    invalidateKeys?: string[];
    /** Custom success message to display on successful requests */
    customSuccessMessage?: string;
    /** Flag to show default API success messages */
    showApiSuccessMesssage?: boolean;
    /** Flag to show default API error messages */
    showApiErrorMesssage?: boolean;
    /** Custom error message to display on failed requests */
    customErrorMessage?: string;
}

export function useMutation<TBody extends object, TResponse = any>(
    props: IMutationProps
) {
    const {
        method,
        url,
        invalidateKeys = [],
        customSuccessMessage,
        showApiSuccessMesssage = false,
        showApiErrorMesssage = true,
        customErrorMessage,
    } = props;

    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Makes an API request with the provided parameters
     * @param body Request payload for POST/PUT/PATCH methods
     * @param axiosOptions Additional Axios configuration options
     * @param urlParams Parameters for constructing a dynamic URL
     */
    const makeRequest = async (
        body?: TBody,
        urlParams: IUrlParams = {},
        axiosOptions: AxiosRequestConfig = {}
    ): Promise<TResponse> => {
        setIsLoading(true);

        // Resolve the API URL, supports both static and dynamic URLs
        const apiUrl = typeof url === "function" ? url(urlParams) : url;

        try {
            // Make the API request using the specified method
            const apiResponse = await createApiClient()[method]<IApiResponse<TResponse>>(
                apiUrl,
                body ?? {},
                {
                    ...axiosOptions,
                }
            );

            const response = apiResponse.data; // Extract data from Axios response

            // Invalidate React Query cache if specified
            if (invalidateKeys.length > 0) {
                invalidateKeys.forEach((fetchKey) =>
                    {queryClient.invalidateQueries(fetchKey)}
                );
            }

            // Handle success messages
            if (customSuccessMessage?.trim()) {
                Toast.success("Success", customSuccessMessage);
            } else if (showApiSuccessMesssage) {
                Toast.success(
                    "Success",
                    response?.message ?? "Operation successful"
                );
            }

            return response.data; // Return the extracted response data
        } catch (err: any) {
            // Handle Axios-specific errors
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    // Server responded with an error
                    const errorMessage = (() => {
                        const { data } = err.response;
                        if (typeof data === "string") {
                            return data;
                        }
                        if (typeof data?.message === "string") {
                            return data.message;
                        }
                        if (typeof data?.error === "string") {
                            return data.error;
                        }
                        return "An error occurred";
                    })();

                    if (customErrorMessage?.trim()) {
                        Toast.error("Error", customErrorMessage);
                    } else if (showApiErrorMesssage && errorMessage) {
                        Toast.error("Error", errorMessage);
                    }
                } else if (err.request) {
                    // No response received from server
                    if (!navigator.onLine && err.code === "ERR_NETWORK") {
                        Toast.error(
                            "Error",
                            "Cannot connect to the Internet. Please check your network."
                        );
                    } else {
                        Toast.error(
                            "Error",
                            "Something went wrong. Please contact support."
                        );
                    }
                }
            }

            throw err; // Re-throw the error for further handling
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return {
        makeRequest, // Expose the API request function
        isLoading, // Expose the loading state
        queryClient, // Expose the query client for additional use
    };
}
