/* eslint-disable @typescript-eslint/no-explicit-any */
export const evaluateFormikError = (
    errors: any,
    touched: any,
    name: string
) => {
    if (touched?.[name] && errors?.[name]) {
        return errors[name];
    } else {
        return "";
    }
};
