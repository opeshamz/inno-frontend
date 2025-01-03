import clsx from "clsx";

export const Fallback = ({ screen = false }: { screen?: boolean }) => {
    return (
        <div
            className={clsx(
                screen ? "h-screen w-screen" : "min-h-[200px] h-full w-full",
                " grid place-content-center place-items-center bg-transparent"
            )}
        >
            <p className="text-2xl font-J-SemiBold text-gold animate-bounce">
                {" "}
                Articulate
            </p>
        </div>
    );
};

export default Fallback;
