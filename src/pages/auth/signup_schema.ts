import {  object, string, ref,  } from "yup";

const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/;

export const schema = object({
    name: string().required().trim().label("Full name"),
    email: string().email().required().trim().label("Email"),
 
    password: string()
        .required()
        .min(8, "Password must be at least 8 characters")
        .label("Password")
        .matches(passwordRegex, {
            message:
                "Password should include Uppercase, Lowercase, Number & Special Character.",
        }),
    confirm_password: string()
        .required()
        .oneOf([ref("password")], "Password doesn't match")
        .label("Confirm Password"),
});
