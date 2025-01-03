import { useFormik } from "formik";
import TextInput from "@/components/form_fields/TextInput";

import { Link, useNavigate } from "react-router-dom";
import { evaluateFormikError } from "@/utils/helpers";
import { AuthService } from "@/services/auth.service";
import { schema } from "./signup_schema";
import Button from "@/components/Button/Button";

const Signup = () => {
    const navigate = useNavigate();

    const signupApi = AuthService.useSignUp();

    const form = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        validateOnMount: true,
        enableReinitialize: false,
        validationSchema: schema,
        onSubmit: (values) => {
            const { name, email, password } = values;
            const payload = { name, email, password };
            signupApi.makeRequest(payload).then(() => {
                navigate("/auth/login");
            });
        },
    });

    const { isValid, errors, handleSubmit, touched, getFieldProps } = form;

    return (
        <form onSubmit={handleSubmit} className="w-full sm:w-[400px] mx-auto">
            <h6 className="font-J-Bold text-gold text-[30px]">
                Create Account
            </h6>

            <div className="flex flex-col mt-5 gap-y-[10px]">
                <TextInput
                    {...getFieldProps(`name`)}
                    error={evaluateFormikError(errors, touched, "name")}
                    placeholder="full name"
                    label="Full Name"
                    required
                />

                <TextInput
                    {...getFieldProps(`email`)}
                    error={evaluateFormikError(errors, touched, "email")}
                    placeholder="example@email.com"
                    label="Email"
                    type="email"
                    required
                />

                <TextInput
                    type="password"
                    label="Password"
                    required
                    {...getFieldProps(`password`)}
                    error={evaluateFormikError(errors, touched, "password")}
                />
                <TextInput
                    type="password"
                    label="Confirm Password"
                    required
                    {...getFieldProps(`confirm_password`)}
                    error={evaluateFormikError(
                        errors,
                        touched,
                        "confirm_password"
                    )}
                />
            </div>

            <div className="mt-[28px]">
                <Button
                    type="submit"
                    renderAs="button"
                    fullWidth
                    loading={signupApi.isLoading}
                    disabled={!isValid || signupApi.isLoading}
                >
                    Continue
                </Button>
            </div>
            <div className="mt-[25px] flex items-center">
                <div className="flex-1 h-[1px] bg-gray2"></div>
                <span className="px-2 text-inputGray">or</span>
                <div className="flex-1 h-[1px] bg-gray2"></div>
            </div>
            <div className="mt-[25px] flex mb-10 flex-col items-center">
                <p className="font-J-Medium text-inputGray">
                    Have an account?{" "}
                    <Link
                        to={`/auth/login`}
                        className="text-gold cursor-pointer"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default Signup;
