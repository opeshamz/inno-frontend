import Filter from "@/components/Filter";
import SearchInput from "@/components/form_fields/SearchInput";
import Pagination from "@/components/Pagination";
import Skeleton from "@/components/Skeleton";
import { useURLQuery } from "@/hooks/useURLQuery";
import { IArticle } from "@/interfaces/article.interface";
import { ArticleService } from "@/services/articles.service";
import { formatDate } from "@/utils/date.utils";
import clsx from "clsx";

const Home = () => {
    const { value } = useURLQuery();

    const { data, isSuccess, isLoading } = ArticleService.useArticles({
        search: value?.search,
        startDate: value?.startDate,
        endDate: value?.endDate,
        category: value?.category,
        source: value?.source,
        page: value?.page ?? "1",
    });

    return (
        <section className="pt-16">
            <div className="global-container">
                <div className="flex global-container flex-col gap-y-6 items-center">
                    <h5 className="text-2xl text-dbGray font-J-Bold text-center max-w-[700px]">
                        Articulate is the fastest method to keep up with the
                        topics and trends that interest you.
                    </h5>
                    <div className="w-[400px]">
                        <SearchInput placeholder="Enter keyword" />
                    </div>

                    <Filter />
                </div>

                <div className="mt-12 ">
                    <h6 className="text-lg underline font-J-SemiBold text-dbGray">
                        Feeds
                    </h6>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {isLoading && <Loader />}
                        {isSuccess &&
                            data.data.map((article, index) => (
                                <NewsCard data={article} key={index} />
                            ))}
                    </div>
                </div>
                <div className="flex py-8 justify-center">
                    <Pagination totalPages={data?.last_page ?? 1} />
                </div>
            </div>
        </section>
    );
};

export default Home;

interface INewsCardProps {
    data: IArticle;
}

function NewsCard({ data }: INewsCardProps) {
    return (
        <div className="flex p-4 rounded bg-white flex-col gap-y-4">
            <img
                src={data.img_url}
                className="block object-cover rounded h-[240px]"
            />
            <h6 className="text-gold font-J-Medium text-sm">
                {data?.author ?? ""} • {formatDate(data?.created_at ?? "")}
            </h6>
            <h4 className="text-dbGray font-J-SemiBold text-2xl">
                {data.title}
            </h4>
            <p className="text-blueGray">
                {data?.content?.length > 150
                    ? `${data?.content?.slice(0, 147)}...`
                    : data.content}
            </p>
            <div className="flex items-center gap-x-3">
                <span
                    className={clsx(
                        "rounded-[15px] py-1 font-J-Medium text-xs px-5 inline-block w-auto",
                        "text-yellow-700 bg-yellow-200"
                    )}
                >
                    {data?.category?.toUpperCase() ?? ""}
                </span>
                <span
                    className={clsx(
                        "rounded-[15px] py-1 font-J-Medium text-xs px-5 inline-block w-auto",
                        "bg-[#A3ABBC] text-white"
                    )}
                >
                    {data?.source?.toUpperCase() ?? ""}
                </span>
            </div>
        </div>
    );
}

function Loader() {
    return (
        <>
            {Array(10)
                .fill("")
                .map((_, index) => (
                    <div
                        key={`loader_${index}`}
                        className="flex p-4 rounded bg-white flex-col gap-y-4"
                    >
                        <Skeleton className="h-[240px] rounded" />
                        <Skeleton className="h-6 w-[4/5] rounded" />

                        <div className="flex flex-col gap-y-2">
                            <Skeleton className="h-4 rounded" />
                            <Skeleton className="h-4 rounded" />
                            <Skeleton className="h-4 w-[4/5] rounded" />
                        </div>

                        <div className="flex items-center gap-x-3">
                            <Skeleton className="h-4 w-[70px] rounded-xl" />
                            <Skeleton className="h-4 w-[70px] rounded-xl" />
                        </div>
                    </div>
                ))}
        </>
    );
}
