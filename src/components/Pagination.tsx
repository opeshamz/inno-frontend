import ReactPaginate from "react-paginate";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useURLQuery } from "@/hooks/useURLQuery";
import useIsMobile from "@/hooks/useIsMobile";

const Pagination = ({ totalPages }: { totalPages: number }) => {
    const searchQueries = useURLQuery();
    const pageNumber = parseInt(searchQueries.value?.page ?? "1", 10);

    const isMobile = useIsMobile();

    const changePage = (_page: { selected: number }) => {
        searchQueries.setURLQuery({
            page: ((_page?.selected ?? 0) + 1).toString(),
        });
    };

    return (
        <div className="flex mr-4 justify-end">
            <ReactPaginate
                previousLabel={<PreviousButton />}
                nextLabel={<NextButton />}
                breakLabel="..."
                breakClassName="rounded-sm mr-2 h-full text-primary text-center pt-2 w-10 bg-white"
                pageCount={totalPages}
                disableInitialCallback
                forcePage={pageNumber - 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={isMobile ? 0 : 2}
                onPageChange={changePage}
                containerClassName="flex justify-center items-center"
                pageClassName="bg-white shadow-card mr-2 rounded-lg cursor-pointer text-center text-primary text-sm font-medium"
                activeClassName="!text-slate-700 !bg-slate-300"
                pageLinkClassName="flex items-center justify-center h-10 w-10 hover:no-underline no-underline"
            />
        </div>
    );
};

export default Pagination;

function NextButton() {
    return (
        <div className="h-10 flex items-center ml-2 gap-x-2">
            <span className="text-sm font-medium text-primary">Next</span>
            <ArrowRightIcon className="w-5 text-ksu-textPrimary" />
        </div>
    );
}

function PreviousButton() {
    return (
        <div className="h-10 flex items-center gap-x-2 mr-2">
            <ArrowLeftIcon className="w-5 text-ksu-textPrimary" />
            <span className="text-sm font-medium text-primary">Previous</span>
        </div>
    );
}
