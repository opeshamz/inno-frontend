import Cookies from "js-cookie";
import { appConstants } from "./constants.util";


const cookieOptions = { secure: true, sameSite: "strict" as const };

type storageItem = "token" | "refreshToken";


export const storageHelper = {
    // Cookies Storage

    hasCookieItem: (item: storageItem = "token") => {
        return !!Cookies.get(getStorageItemName(item));
    },

    getCookieItem: (item: storageItem = "token") => {
        return Cookies.get(getStorageItemName(item));
    },

    clearCookieItem: (item: storageItem = "token") => {
        Cookies.remove(getStorageItemName(item));
    },

    setCookieItem: (
        item: storageItem = "token",
        val: string,
        expiresAt?: Date
    ) => {
        Cookies.set(
            getStorageItemName(item),
            val ?? "",
            expiresAt
                ? {
                      expires: expiresAt,
                      ...cookieOptions,
                  }
                : cookieOptions
        );
    },
};

export function getStorageItemName(item: storageItem) {
    switch (item) {
        case "token": {
            return appConstants.tokenName;
        }
        default: {
            return appConstants.tokenName;
        }
    }
}
