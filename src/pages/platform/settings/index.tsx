import Button from "@/components/Button/Button";
import SelectInput from "@/components/form_fields/SelectInput";
import { ArticleService } from "@/services/articles.service";
import { PreferenceService } from "@/services/preference.service";
import { useState } from "react";

const Settings = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [sources, setSources] = useState<string[]>([]);
    const [authors, setAuthors] = useState<string[]>([]);

    const isValid =
        categories.length > 0 || sources.length > 0 || authors.length > 0;

    const CategoriesData = ArticleService.useCategories();
    const SourcesData = ArticleService.useSources();
    const AuthorsData = ArticleService.useAuthors();

    const categoriesOptions =
        CategoriesData?.data?.map((val) => {
            return { label: val, value: val };
        }) ?? [];
    const sourcesOptions =
        SourcesData?.data?.map((val) => {
            return { label: val, value: val };
        }) ?? [];
    const authorsOptions =
        AuthorsData?.data?.map((val) => {
            return { label: val, value: val };
        }) ?? [];

    PreferenceService.usePreference((preference) => {
        setCategories(preference?.categories ?? []);
        setSources(preference?.sources ?? []);
        setAuthors(preference?.authors ?? []);
    });

    const updatePreferenceApi = PreferenceService.useUpdatePreference()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        const payload = {
            sources,authors,categories
        }
        updatePreferenceApi.makeRequest(payload)
     }

    return (
        <section className="global-container">
            <form
                onSubmit={handleSubmit}
                className="w-full sm:w-[600px] mx-auto bg-white rounded p-4 sm:p-10 mt-16 shadow-card flex flex-col gap-y-6"
            >
                <h6 className="text-2xl text-center text-dbGray font-J-Bold">
                    Settings/Preferences
                </h6>
                <div className="border-b border-slate-300 pb-6">
                    <SelectInput
                        label="Categories"
                        placeholder="Select multiple categories"
                        isMulti
                        isLoading={CategoriesData.isLoading}
                        value={categories}
                        name="categories"
                        options={categoriesOptions}
                        onChange={(val) => {
                            setCategories(val as string[]);
                        }}
                    />
                </div>
                <div className="border-b border-slate-300 pb-6">
                    <SelectInput
                        label="Authors"
                        placeholder="Select multiple authors"
                        isMulti
                        isLoading={AuthorsData.isLoading}
                        value={authors}
                        name="authors"
                        options={authorsOptions}
                        onChange={(val) => {
                            setAuthors(val as string[]);
                        }}
                    />
                </div>
                <div className="pb-6">
                    <SelectInput
                        label="Sources"
                        placeholder="Select multiple sources"
                        isMulti
                        isLoading={SourcesData.isLoading}
                        value={sources}
                        name="sources"
                        options={sourcesOptions}
                        onChange={(val) => {
                            setSources(val as string[]);
                        }}
                    />
                </div>
                <div className="">
                    <Button
                        loading={updatePreferenceApi.isLoading}
                        type="submit"
                        disabled={!isValid || updatePreferenceApi.isLoading}
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default Settings;
