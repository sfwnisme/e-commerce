import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddUserInputs, ErrorResponseType } from "../../../types/Types";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import { useMutation } from "@tanstack/react-query";
import { AXIOS, USER } from "../../../utils/AXIOS";
import { Button, Label, Select, TextInput } from "flowbite-react";
import * as yup from "yup";
import { toast } from "react-toastify";

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
  role: yup.string().required("role is required"),
});

const AddUser = () => {
  // mutation
  const { mutateAsync } = useMutation({
    mutationKey: [`add${USER}` || "adduser"],
    mutationFn: (data: AddUserInputs) => AXIOS.post(`${USER}/add`, data),
  });

  const {
    trigger,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<AddUserInputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<AddUserInputs> = async (data) => {
    try {
      const res = await mutateAsync(data);
      console.log("user has been added successfully", res);
      toast("You have successfully added user", {
        type: "success",
      });
    } catch (error) {
      toast(ServerErrorResponse(error as ErrorResponseType), {
        type: "error",
      });
      console.log(ServerErrorResponse(error as ErrorResponseType));
    }
  };

  console.log(watch());

  return (
    <div className="flex items-center justify-center w-full">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Create user</h1>
        <hr className="border-gray-500 mb-2" />
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="name@flowbite.com"
              required
              shadow
              {...register("name")}
              onBlur={() => trigger("name")}
            />
          </div>
          <small className="text-red-600">{errors?.name?.message}</small>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="sfwn@sfwn.me"
              required
              shadow
              {...register("email")}
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
              placeholder="Your password"
              required
              shadow
              {...register("password")}
              onBlur={() => trigger("password")}
            />
          </div>
          <small className="text-red-600">{errors?.password?.message}</small>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Select your country" />
            </div>
            <Select
              id="countries"
              required
              {...register("role")}
              onBlur={() => trigger("role")}
            >
              <option>admin</option>
              <option>product manager</option>
              <option>writer</option>
              <option>user</option>
            </Select>
          </div>
          <small className="text-red-600">{errors?.role?.message}</small>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Register new account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
