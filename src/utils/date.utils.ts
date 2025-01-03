import dayjs from "dayjs";

export const formatDate = (date: string) => {
    return dayjs(date).format("MMM DD, YYYY");
};
export const dateToString = (date: Date) => dayjs(date).format("YYYY-MM-DD");

export const stringToDate = (date: string) => dayjs(date).toDate();

export const isValidDate = (date: Date | null | string) =>
    dayjs(date).isValid();

