import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddUserInputs, ErrorResponseType } from "../../../types/Types";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import { useMutation } from "@tanstack/react-query";
import { AXIOS, USER } from "../../../utils/AXIOS";
import { Label, Select, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import { AddUserYupSchema } from "../../../utils/yupSchema";
import UsersRoleOption from "../../../components/UsersRoleOption";
import Btn from "../../../components/Btn";

const AddUser = () => {
  // mutation
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [`add${USER}` || "addUser"],
    mutationFn: (data: AddUserInputs) => AXIOS.post(`${USER}/add`, data),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<AddUserInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(AddUserYupSchema),
  });

  console.log('validation-------------', isValid)

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

  console.log("values ", getValues("name"));
  return (
    <div className="flex items-center justify-center w-full">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Create user</h1>
        <hr className="border-gray-500 mb-2" />
        <form
          className="flex max-w-full flex-col gap-4 w-96"
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
              placeholder="sfwn@sfwn.me"
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
            <small className="text-red-600">{errors?.email?.message}</small>
          </div>
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
              color={
                getValues("password")
                  ? errors?.password?.message
                    ? "failure"
                    : "success"
                  : "default"
              }
              {...register("password")}
            />
            <small className="text-red-600">{errors?.password?.message}</small>
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="roles" value="Select the role" />
            </div>
            <Select
              id="roles"
              required
              color={
                getValues("role")
                  ? errors?.role?.message
                    ? "failure"
                    : "success"
                  : "default"
              }
              {...register("role")}
            >
              <UsersRoleOption />
            </Select>
            <small className="text-red-600">{errors?.role?.message}</small>
          </div>
          <Btn
            text="Add"
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

export default AddUser;
