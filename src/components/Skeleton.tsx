import clsx from "clsx";

interface Props {
    className?: string;
}

const Skeleton = ({ className }: Props) => {
    return <div className={clsx("custom-skeleton min-h-2", className)} />;
};

export default Skeleton;

// usage
{
    /* <Skeleton className="h-16 w-16 rounded" /> */
}
