export interface ILoginPayload {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    user: IUser;
}
export interface ISignupPayload {
    name: string;
    email: string;
    password: string;
}

export interface ISignupResponse {
    user: IUser;
}

export interface IChangePassword {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}
