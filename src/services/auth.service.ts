/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@/hooks/useMutation";
import {
    ILoginPayload,
    ISignupPayload,
    ILoginResponse,
    ISignupResponse,
} from "../interfaces/auth.interface";



const AuthApiUrl = {
    login: '/login',
    signup: '/register',
   
};

export const AuthService = {
    useLogin: () =>
        useMutation<ILoginPayload, ILoginResponse>({
            url: AuthApiUrl.login,
            method: "post",
            customErrorMessage: "Invalid Credentials",
        }),
    useSignUp: () =>
        useMutation<ISignupPayload, ISignupResponse>({
            url: AuthApiUrl.signup,
            method: "post",
            customSuccessMessage:"Signup completed successfully"
        }),
 
};
