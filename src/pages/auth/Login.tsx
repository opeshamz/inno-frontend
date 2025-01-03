import TextInput from "@/components/form_fields/TextInput";
import { storageHelper } from "@/utils/storage.util";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { evaluateFormikError } from "@/utils/helpers";
import { AuthService } from "@/services/auth.service";
import Button from "@/components/Button/Button";
import { useDispatch } from "react-redux";
import { setUser, setAuthentication } from "@/redux/slices/dashboardSlice";

const schema = object({
    email: string().email().required().trim().label("Email"),
    password: string().required().label("Password"),
});

const Login = () => {
    const dispatch = useDispatch();

    const loginApi = AuthService.useLogin();

    const form = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnMount: true,
        enableReinitialize: false,
        validationSchema: schema,
        onSubmit: (values) => {
            loginApi.makeRequest(values).then((response) => {
                storageHelper.setCookieItem("token", response.token);
                dispatch(setUser(response.user));
                dispatch(setAuthentication(true));
            });
        },
    });

    const { isValid, errors, touched, getFieldProps, handleSubmit } = form;

    return (
        <section className="w-full sm:w-[400px] mx-auto">
            <form onSubmit={handleSubmit} className="">
                <h6 className="font-J-Bold text-gold text-[30px]">Sign In</h6>

                <div className="grid grid-cols-1 mt-[46px] gap-y-[28px]">
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
                </div>

                <div className="mt-[28px]">
                    <Button
                        type="submit"
                        disabled={!isValid || loginApi.isLoading}
                        fullWidth
                        loading={loginApi.isLoading}
                    >
                        Continue
                    </Button>
                </div>
            </form>

            <div className="mt-[25px] flex items-center">
                <div className="flex-1 h-[1px] bg-gray2"></div>
                <span className="px-2 text-inputGray">or</span>
                <div className="flex-1 h-[1px] bg-gray2"></div>
            </div>
            <div className="mt-[15px] flex mb-10 flex-col items-center">
                <p className="font-J-Medium text-inputGray mt-[29px]">
                    {`Don't`} have an account?{" "}
                    <Link
                        to={`/auth/sign-up`}
                        className="text-gold cursor-pointer"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
