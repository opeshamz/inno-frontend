export type IButtonVariant = "primary" | "secondary";

export type IButtonIconPosition = "left" | "right";

export type IButtonSizes = "big" | "medium" | "small";

export const buttonVariantStylesMap: Readonly<Record<IButtonVariant, string>> = {
    primary: "bg-gold hover:bg-gold/90 text-white text-sm font-semibold",
    secondary:
        "border bg-white border-lightGray text-gray700 text-sm font-semibold",
};

export const buttonSizeMap: Readonly<Record<IButtonSizes, string>> = {
    big: "h-[50px]",
    medium: "h-[40px]",
    small: "h-[30px]",
};
