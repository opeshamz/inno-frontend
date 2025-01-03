
import { AxiosRequestConfig } from "axios";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { createApiClient } from "@/services/AxiosConfig";
import { IApiResponse } from "@/interfaces/api.interface";

export type IParams = Record<
    string,
    string | number | null | undefined | boolean
>;
type ICleanedParams = Record<string, string | number | boolean>;

interface IFetchProps<T>
    extends Omit<UseQueryOptions<T>, "queryKey" | "queryFn"> {
    url: string;
    key: string;
    params?: IParams;
    axiosOptions?: AxiosRequestConfig;
}

// Utility function to clean params
const cleanParams = (params: IParams): ICleanedParams => {
    return (
        Object.entries(params || {})
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ([_, value]) =>
                    value !== null && value !== undefined && value !== ""
            )
            .reduce((acc, [key, value]) => {
                acc[key] = value as string | number | boolean;
                return acc;
            }, {} as ICleanedParams)
    );
};

// Extracted query function
async function fetchData<TData>(
    url: string,
    params: IParams,
    axiosOptions: AxiosRequestConfig
): Promise<TData> {
    const cleanedParams = cleanParams(params);

    const response = await createApiClient().get<IApiResponse<TData>>(url, {
        data: {},
        params: cleanedParams,
        ...axiosOptions,
    });

    return response.data.data;
}

function useFetch<TData>({
    url,
    key,
    params = {},
    refetchOnWindowFocus = false,
    axiosOptions = {},
    ...queryOptions
}: IFetchProps<TData>) {
    return useQuery([key, { url, ...params }] as QueryKey,
         () => fetchData<TData>(url, params, axiosOptions),
       { refetchOnWindowFocus,
        ...queryOptions,}
    );
}

export default useFetch;
