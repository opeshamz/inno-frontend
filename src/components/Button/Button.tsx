import clsx from "clsx";
import { forwardRef } from "react";

import {
    buttonSizeMap,
    buttonVariantStylesMap,
    IButtonIconPosition,
    IButtonSizes,
    IButtonVariant,
} from "./config";
import  {Link, LinkProps } from 'react-router-dom'
import Spinner from "@/components/Spinner";

type NextLinkType = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

interface CommonProps {
    fullWidth?: boolean;
    disabled?: boolean;
    icon?: string | React.ReactElement;
    variant?: IButtonVariant;
    iconPosition?: IButtonIconPosition;
    className?: string;
    buttonSize?: IButtonSizes;
}

// Button props extending HTMLButtonElement
interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        CommonProps {
    renderAs?: "button";
    loading?: boolean;
}

// Next.js link props extending NextLink
interface NextLinkProps extends NextLinkType, CommonProps {
    renderAs?: "internal_link";
    href: string;
}

// External link props extending HTMLAnchorElement
interface ExternalLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
        CommonProps {
    renderAs?: "external_link";
    href: string;
    newTab?: boolean;
}

// Discriminated union for the different types of components
type Props = ButtonProps | NextLinkProps | ExternalLinkProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
    (
        {
            fullWidth = false,
            renderAs = "button",
            className,
            disabled,
            icon,
            buttonSize = "medium",
            iconPosition = "left",
            variant = "primary",
            ...props
        },
        ref
    ) => {
        const styles = clsx([
            "items-center rounded gap-x-2 px-5 flex justify-center relative overflow-hidden",
            // icon ? "px-5" : "px-6",
            disabled &&
                "disabled:cursor-not-allowed disabled:hover:bg-opacity-50",
            disabled && "bg-opacity-50",
            buttonVariantStylesMap[variant],
            fullWidth ? "w-full" : "whitespace-nowrap w-auto",
            buttonSizeMap[buttonSize],
            className,
        ]);

        // Helper function for rendering icon
        const renderIcon = (
            icon: string | React.ReactElement,
            position: "left" | "right"
        ) => (
            <>
                {typeof icon === "string" ? (
                    <img
                        src={`/icons/${icon}.svg`}
                        className={clsx(position === "left" ? "mr-2" : "ml-2")}
                        alt={icon}
                        width={16}
                        height={16}
                    />
                ) : (
                    icon
                )}
            </>
        );

        const _children = (
            <>
                {icon && iconPosition === "left" && renderIcon(icon, "left")}
                {props.children}
                {icon && iconPosition === "right" && renderIcon(icon, "right")}
            </>
        );

        if (renderAs === "internal_link") {
            const { href } = props as NextLinkProps;
            return (
                <Link
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    to={href}
                    className={styles}
                >
                    {_children}
                </Link>
            );
        }

        if (renderAs === "external_link") {
            const { href, newTab } = props as ExternalLinkProps;
            return (
                <a
                    {...(newTab ? { target: "_blank" } : {})}
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    className={styles}
                >
                    {_children}
                </a>
            );
        }

        const { loading, type } = props as ButtonProps;

        return (
            <button
                disabled={disabled || loading}
                className={styles}
                {...(props as ButtonProps)}
                type={type ?? "button"}
                ref={ref as React.Ref<HTMLButtonElement>}
            >
                {loading && (
                    <span className="flex items-center justify-center">
                        <Spinner />
                    </span>
                )}
                {_children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
