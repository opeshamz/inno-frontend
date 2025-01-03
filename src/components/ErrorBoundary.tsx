/* eslint-disable react/display-name */
import { ReactNode } from "react";

import {
    ErrorBoundary as ReactErrorBoundary,
    FallbackProps,
} from "react-error-boundary";
import PrimaryButton from "./Button/PrimaryButton";
import Button from "./Button/Button";

export const ErrorBoundary = ({
    children,
    onReset,
}: {
    children: ReactNode;
    onReset?: () => void;
}) => {
    return (
        <ReactErrorBoundary
            FallbackComponent={DefaultErrorFallback(!!onReset)}
            onReset={() => {
                onReset?.();
            }}
            onError={(
                error: Error,
                info: { componentStack?: string | null | undefined }
            ) => {
                console.log(info.componentStack);
                if (
                    error.message.includes(
                        "Failed to fetch dynamically imported module"
                    )
                ) {
                    window.location.reload();
                }
            }}
        >
            {children}
        </ReactErrorBoundary>
    );
};

const DefaultErrorFallback =
    (reset: boolean) =>
    ({ resetErrorBoundary }: FallbackProps) => {
        return (
            <div className=" h-screen px-5 w-screen grid justify-center items-center">
                <div className="flex flex-col items-center">
                    <img className="mb-5 w-[50px]" src="/images/tools.svg" />
                    <h6 className="text-[20px] text-blueGray font-J-Medium">
                        We encountered an error while loading this page
                    </h6>
                    <p className="text-blueGray max-w-[300px] mt-2 text-center">
                        If issue persist after reloading, kindly contact our
                        support team.
                    </p>

                    {reset && (
                        <div className="w-[200px] mt-5">
                            <Button onClick={() => resetErrorBoundary()}>
                                Reload page
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    };
