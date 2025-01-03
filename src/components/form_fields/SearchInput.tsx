import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "react-use";
import { useURLQuery } from "@/hooks/useURLQuery";

type IOnChange = React.ComponentProps<"input">["onChange"];

const SearchInput = ({ placeholder }: { placeholder: string }) => {
    const query = useURLQuery();
    const searchInternalValue = useState(query?.value?.search ?? "");

    useDebounce(
        () => {
            if (searchInternalValue[0]) {
                query.setURLQuery({ search: searchInternalValue[0] });
            } else {
                query.setURLQuery({}, true);
            }
        },
        1000,
        [searchInternalValue[0]]
    );

    const handleChange: IOnChange = (e) => {
        searchInternalValue[1](e.target.value);
    };

    return (
        <div className="flex items-center py-[10px] border border-slate-300 px-5 rounded-[10px] bg-white">
            <MagnifyingGlassIcon className="h-4 w-4 text-blueGray" />
            <input
                type="text"
                name="search"
                value={searchInternalValue[0]}
                id="search"
                onChange={handleChange}
                placeholder={placeholder}
                className="h-[20px] block placeholder:text-gray-400 text-xs px-4 w-full text-blueGray outline-none"
            />
        </div>
    );
};

export default SearchInput;
