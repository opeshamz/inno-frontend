/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useMutation } from "@/hooks/useMutation";

type Params = {
    startDate?: string;
    endDate?: string;
    search?: string;
    source?: string;
    category?: string;
    page?:string
};

import useFetch from "@/hooks/useFetch";
import { IPaginatedResponse } from "@/interfaces/api.interface";
import { IArticle } from "@/interfaces/article.interface";

export const ArticleQueryKeys = {
    getArticles: "ARTICLES",
    categories: "CATEGORIES",
    authors: "AUTHORS",
    sources: "SOURCES",
};
const ArticleApiUrl = {
    articles: "/articles",
    categories: "/articles/categories",
    authors: "/articles/authors",
    sources: "/articles/source",
};

export const ArticleService = {
    useArticles: (params: Params = {}) =>
        useFetch<IPaginatedResponse<IArticle[]>>({
            url: ArticleApiUrl.articles,
            key: ArticleQueryKeys.getArticles,
            params,
        }),
    useCategories: () =>
        useFetch<string[]>({
            url: ArticleApiUrl.categories,
            key: ArticleQueryKeys.categories,
        }),
    useAuthors: () =>
        useFetch<string[]>({
            url: ArticleApiUrl.authors,
            key: ArticleQueryKeys.authors,
        }),
    useSources: () =>
        useFetch <string[]>({
            url: ArticleApiUrl.sources,
            key: ArticleQueryKeys.sources,
        }),
    
};
