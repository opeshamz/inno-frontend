/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useMutation } from "@/hooks/useMutation";



import useFetch from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { IPreference } from "@/interfaces/preference.interface";
import { ArticleQueryKeys } from "./articles.service";


interface IPreferencePayload {
    sources: string[]
    categories: string[]
    authors: string[]
}


const PreferenceQueryKeys = {
    getPreference: "PREFERENCE",
   
};
const PreferenceApiUrl = {
    getPreference: "/preference",
    updatePreference: "/preference",
   
};

export const PreferenceService = {
    usePreference: (onSuccess: (preference: IPreference) => void) =>
        useFetch<IPreference>({
            url: PreferenceApiUrl.getPreference,
            key: PreferenceQueryKeys.getPreference,
            onSuccess
        }),
    useUpdatePreference: () =>
        useMutation<IPreferencePayload>({
            url: PreferenceApiUrl.updatePreference,
            method:"put",
            invalidateKeys: [ArticleQueryKeys.getArticles,PreferenceQueryKeys.getPreference],
            customSuccessMessage: "Preference updated successfully"
        }),
    
    
};
