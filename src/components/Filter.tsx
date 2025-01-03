import * as Popover from "@radix-ui/react-popover";

import { XMarkIcon } from "@heroicons/react/24/solid";

import { object, string, date } from "yup";
import { FormikProvider, useFormik } from "formik";

// import { useRouteQuery } from "@/utils/hooks/useRouteQuery";
import CustomDatePicker from "./form_fields/DatePicker";
import SelectInput from "./form_fields/SelectInput";

import { useState } from "react";
import { useURLQuery } from "@/hooks/useURLQuery";
import Button from "./Button/Button";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { dateToString, isValidDate } from "@/utils/date.utils";
import { ArticleService } from "@/services/articles.service";


export default function Filter() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState("");

    const CategoriesData = ArticleService.useCategories()
    const SourcesData = ArticleService.useSources()

    const categoriesOptions =CategoriesData?.data?.map((val) => {return{ label:val,value:val }})??[]
    const sourcesOptions =SourcesData?.data?.map((val) => {return{ label:val,value:val }})??[]

    const query = useURLQuery();


    const form = useFormik({
        initialValues: {
            category: "",
            startDate: null,
            endDate: null,
            source: "",
        },
        validateOnMount: true,
        validationSchema: object({
            category: string(),
            source: string(),
            startDate: date().nullable(),
            endDate: date().nullable(),
        }),
        onSubmit: (values) => {
            handleFilter(values);
            setIsFilterOpen(false);
        },
    });

    const customDate = [
        "Today",
        "Last 7 days",
        "30 days",
        "1 year",
        "All Time",
    ];

    const handleFilter = (filters: Record<string, string | Date | null>) => {
        const validObjects = Object.entries(filters)
            .filter(([, val]) => val !== "")
            .map(([key, val]) => ({ [key]: isValidDate(val)? dateToString(val as Date):val }));
        const mergedObject = Object.assign({}, ...validObjects);
        query.setURLQuery(mergedObject);
    };

    const handleClearFilter = () => {
        query.setURLQuery({ page: "1" }, true);
        handleCustomDate("");
    };

    const handleCustomDate = (item: string) => {
        setSelectedDay(item);
        switch (item) {
            case "Today":
                form.setFieldValue("startDate", new Date());
                form.setFieldValue("endDate", new Date());
                break;
            case "Last 7 days":
                form.setFieldValue(
                    "startDate",
                    new Date(new Date().setDate(new Date().getDate() - 7))
                );
                form.setFieldValue("endDate", new Date());
                break;
            case "30 days":
                form.setFieldValue(
                    "startDate",
                    new Date(new Date().setDate(new Date().getDate() - 30))
                );
                form.setFieldValue("endDate", new Date());
                break;
            case "1 year":
                form.setFieldValue(
                    "startDate",
                    new Date(new Date().setDate(new Date().getDate() - 365))
                );
                form.setFieldValue("endDate", new Date());
                break;
            case "All Time":
                form.setFieldValue("startDate", new Date(0));
                form.setFieldValue("endDate", new Date());
                break;
            default:
                break;
        }
    };

    const { values, setFieldValue } = form;

    return (
        <section className="flex flex-1 items-end">
            <div className="">
                <FormikProvider value={form}>
                    <form onSubmit={form.handleSubmit}>
                        <div>
                            <Popover.Root
                                open={isFilterOpen}
                                onOpenChange={setIsFilterOpen}
                            >
                                <Popover.Trigger>
                                    <Button
                                        iconPosition="right"
                                        icon={
                                            <FunnelIcon className="text-white w-5" />
                                        }
                                        fullWidth
                                        className="!w-[150px] !bg-dbGray"
                                        renderAs="button"
                                    >
                                        Filters
                                    </Button>
                                </Popover.Trigger>
                                {/* h-[480px] overflow-y-auto */}
                                <Popover.Content align="center">
                                    <div className="bg-white mt-1 w-[400px] h-auto flex flex-col justify-between shadow-lg mr-5 rounded-lg">
                                        <input
                                            type="text"
                                            className="opacity-0 absolute w-0"
                                        />
                                        <header className="flex justify-between border-b p-5">
                                            <h6 className="font-J-SemiBold text-sm text-dbGray">
                                                Filter
                                            </h6>
                                            <XMarkIcon
                                                className="w-6 h-6 cursor-pointer rounded-full border p-1 border-mid-night-25 hover:bg-mid-night-25"
                                                onClick={() => {
                                                    setIsFilterOpen(false);
                                                }}
                                            />
                                        </header>
                                        <main className="flex flex-1 h-full overflow-auto flex-col p-5">
                                            <div className="border-b border-[#F7F7FC] flex flex-row flex-wrap gap-2 py-2">
                                                {customDate.map((item) => (
                                                    <div
                                                        key={item}
                                                        className={`border p-2 rounded-full text-xs font-normal bg-gray-50 cursor-pointer ${
                                                            selectedDay ===
                                                                item &&
                                                            "bg-[#FFF4F1] text-rp-orange"
                                                        }`}
                                                        onClick={() => {
                                                            handleCustomDate(
                                                                item
                                                            );
                                                        }}
                                                    >
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="py-2">
                                                <p className="text-lg font-J-SemiBold text-dbGray mb-2">
                                                    Duration
                                                </p>
                                                <div className="flex">
                                                    <div className="w-1/2 mr-[15px]">
                                                        <CustomDatePicker
                                                            label="Start Date"
                                                            date={
                                                                values.startDate
                                                            }
                                                            name="startDate"
                                                            setDate={(v) =>
                                                                form.setFieldValue(
                                                                    "startDate",
                                                                    v
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <CustomDatePicker
                                                            label="End Date"
                                                            date={
                                                                values.endDate
                                                            }
                                                            name="endDate"
                                                            setDate={(v) =>
                                                                form.setFieldValue(
                                                                    "endDate",
                                                                    v
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <SelectInput
                                                    label="Category"
                                                    isLoading={
                                                        CategoriesData.isLoading
                                                    }
                                                    value={values.category}
                                                    placeholder="Select category"
                                                    name="category"
                                                    onChange={(v) => {
                                                        setFieldValue(
                                                            "category",
                                                            v
                                                        );
                                                    }}
                                                    options={categoriesOptions}
                                                />
                                            </div>

                                            <div className="mt-3">
                                                <SelectInput
                                                    value={values.source}
                                                    isLoading={
                                                        SourcesData.isLoading
                                                    }
                                                    label="Source"
                                                    placeholder="Select source"
                                                    name="source"
                                                    onChange={(v) => {
                                                        setFieldValue(
                                                            "source",
                                                            v
                                                        );
                                                    }}
                                                    options={sourcesOptions}
                                                />
                                            </div>
                                        </main>
                                        <footer className="p-5 flex justify-between">
                                            <Button
                                                variant="secondary"
                                                className="text-black w-[97px]"
                                                onClick={() => {
                                                    form.resetForm();
                                                    setIsFilterOpen(false);
                                                    // onCancel();
                                                    handleClearFilter?.();
                                                }}
                                            >
                                                Clear
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="bg-black w-[97px]"
                                                onClick={() => {}}
                                            >
                                                Filter
                                            </Button>
                                        </footer>
                                    </div>
                                </Popover.Content>
                            </Popover.Root>
                        </div>
                    </form>
                </FormikProvider>
            </div>
        </section>
    );
}
