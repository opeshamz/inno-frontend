import {
    ExclamationCircleIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import toast from "react-hot-toast";

export class Toast {
    static error(title: string, message: string) {
        this.showToast("error", title, message);
    }
    static success(title: string, message: string) {
        this.showToast("success", title, message);
    }
    static info(title: string, message: string) {
        this.showToast("info", title, message);
    }
    static warning(title: string, message: string) {
        this.showToast("warning", title, message);
    }
    private static showToast(
        type: "success" | "info" | "warning" | "error",
        title: string,
        message: string
    ) {
        const Icon = {
            warning: (
                <ExclamationCircleIcon className="w-8 h-8 text-yellow-500" />
            ),
            success: <CheckCircleIcon className="w-8 h-8 text-green-500" />,
            info: <InformationCircleIcon className="w-8 h-8 text-blue-500" />,
            error: <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />,
        }[type];
        toast.custom((t) => (
            <div
                className={` ${
                    t.visible ? "animate-enter" : "animate-leave"
                } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex p-2 gap-3 items-center`}
            >
                {Icon}
                <div className={clsx("flex flex-col")}>
                    <span className="block mb-1 text-sm font-semibold">
                        {title}
                    </span>
                    <span className="text-sm">{message}</span>
                </div>
            </div>
        ));
    }
}
