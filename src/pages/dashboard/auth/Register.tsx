"use client";
import { Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { REGISTER } from "../../../utils/AXIOS";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "../../../utils/COOKIES";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import { ErrorResponseType } from "../../../types/Types";
import { registerYupSchema } from "../../../utils/yupSchema";
import Btn from "../../../components/Btn";
import { userRoutesByRole } from "../../../utils/utils";
import { IRegister, registerationQuery } from "../../../queries/Queries";

const Register = () => {
  // const { mutateAsync, isPending } = useMutation({
  //   mutationKey: [REGISTER || "register"],
  //   mutationFn: async (data: RegsiterInputs) =>
  //     AXIOS.post(`/${REGISTER}`, data),
  // });
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [REGISTER || "register"],
    mutationFn: (data: IRegister) => registerationQuery(data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<IRegister>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(registerYupSchema),
  });

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      const res = await mutateAsync(data);
      setCookie("TOKEN", res?.data?.token);
      toast("You have successfully registered", {
        type: "success",
      });
      window.location.pathname = userRoutesByRole(res?.data?.user?.role);
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
              required
              shadow
              color={
                getValues("name")
                  ? errors?.name?.message
                    ? "failure"
                    : "success"
                  : "default"
              }
              {...register("name")}
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
              color={
                getValues("email")
                  ? errors?.email?.message
                    ? "failure"
                    : "success"
                  : "default"
              }
              {...register("email")}
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
              color={
                getValues("password")
                  ? errors?.password?.message
                    ? "failure"
                    : "success"
                  : "default"
              }
              {...register("password")}
            />
          </div>
          <small className="text-red-600">{errors?.password?.message}</small>
          <Btn
            text="Register"
            color="blue"
            size="sm"
            type="submit"
            isValid={isValid}
            isLoading={isPending}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </div>
  );
};
export default Register;
