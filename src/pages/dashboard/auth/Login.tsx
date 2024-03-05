"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AXIOS, LOGIN } from "../../../utils/AXIOS";
import { setCookie } from "../../../utils/COOKIES";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ErrorResponseType, LoginInputs } from "../../../types/Types";

const schema = yup.object({
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password should be at least 6 characters")
    .max(100, "password should be less than 100 characters"),
});

const Login = () => {
  // react query
  const { mutateAsync } = useMutation({
    mutationKey: [LOGIN || "login"],
    mutationFn: (data: LoginInputs) => AXIOS.post(`${LOGIN}`, data),
  });

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    console.log(data);
    try {
      const res = await mutateAsync(data);
      setCookie("TOKEN", res?.data?.token);
      setCookie("ROLE", res?.data?.user?.role);
      window.location.pathname = "/dashboard";
      toast("You are logged in successfully", {
        type: "success",
      });
      console.log("user data", res);
    } catch (error) {
      toast(ServerErrorResponse(error as ErrorResponseType), {
        type: "error",
      });
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Login</h1>
        <hr className="border-gray-500 mb-2" />
        <form
          className="flex w-80 flex-col gap-4 justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              // required
              {...register("email", { required: true })}
              onBlur={() => trigger("email")}
            />
            <small className="text-red-600">{errors?.email?.message}</small>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              // required
              {...register("password", { required: true })}
              onBlur={() => trigger("email")}
            />
            <small className="text-red-600">{errors?.password?.message}</small>
          </div>
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Login;
