"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AXIOS, REGISTER } from "../../../utils/AXIOS";
import Cookie from "cookie-universal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { setCookie } from "../../../utils/COOKIES";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import { ErrorResponseType, RegsiterInputs } from "../../../types/Types";

const schema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(3, "name should be at least 3 characters")
    .max(255, "name should be less than 255 characters"),
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password should be at least 6 characters")
    .max(100, "password should be less than 100 characters"),
});

const Register = () => {
  const { mutateAsync } = useMutation({
    mutationKey: [REGISTER || "register"],
    mutationFn: async (data: RegsiterInputs) =>
      AXIOS.post(`/${REGISTER}`, data),
  });

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegsiterInputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<RegsiterInputs> = async (data) => {
    try {
      const res = await mutateAsync(data);
      setCookie("TOKEN", res?.data?.token);
      toast("You have successfully registered", {
        type: "success",
      });
      window.location.pathname = "/dashboard";
      console.log(res);
    } catch (error) {
      toast(ServerErrorResponse(error as ErrorResponseType), { type: "error" });
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Register</h1>
        <hr className="border-gray-500 mb-2" />
        <form
          className="flex w-80 flex-col gap-4 justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name"
              type="name"
              placeholder="Safwan Mohamed"
              required
              shadow
              {...register("name", {
                required: true,
                minLength: 3,
              })}
              onBlur={() => trigger("name")}
            />
            <small className="text-red-600">{errors?.name?.message}</small>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              required
              shadow
              {...register("email", { required: true })}
              onBlur={() => trigger("email")}
            />
          </div>
          <small className="text-red-600">{errors?.email?.message}</small>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              shadow
              {...register("password", { required: true, minLength: 6 })}
              onBlur={() => trigger("password")}
            />
          </div>
          <small className="text-red-600">{errors?.password?.message}</small>
          <Button type="submit" disabled={!isValid}>
            Register new account
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Register;
