import { yupResolver } from "@hookform/resolvers/yup";
import { Label, Select, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserYupSchema } from "../../../utils/yupSchema";
import { useMutation } from "@tanstack/react-query";
import { AXIOS, USER } from "../../../utils/AXIOS";
import { useParams } from "react-router-dom";
import { ErrorResponseType, UdpateUserInput } from "../../../types/Types";
import { toast } from "react-toastify";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import UsersRoleOption from "../../../components/UsersRoleOption";
import useGetSingleData from "../../../hooks/use-get-single-data";
import Btn from "../../../components/Btn";
import Skeleton from "react-loading-skeleton";

const UpdateUser = () => {
  const { id } = useParams();

  const {
    data: userData,
    isLoading,
    isError,
  } = useGetSingleData(USER, id as string);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (data: UdpateUserInput) =>
      await AXIOS.post(`${USER}/edit/${id}`, data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<UdpateUserInput>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(UpdateUserYupSchema),
    values: {
      ...userData?.data,
    },
  });

  // console.log("before", isLoadingInputs);
  // useEffect(() => {
  //   if (userData) {
  //     setValue(
  //       "userData",
  //       {
  //         name: userData?.data?.name,
  //         email: userData?.data?.email,
  //         role: userData?.data?.role,
  //       },
  //       {
  //         shouldDirty: true,
  //       }
  //     );
  //   }
  // }, [id, userData, setValue]);

  const onSubmit: SubmitHandler<UdpateUserInput> = async (data) => {
    try {
      const res = await mutateAsync(data);
      toast.success("You have successfully updated user");
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(ServerErrorResponse(error as ErrorResponseType));
    }
  };

  const formLoading = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-96 flex-col gap-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="role" value="Role" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <Btn
        text="Update"
        color="blue"
        size="sm"
        outline={false}
        type="submit"
        isLoading={false}
        isValid={false}
      />
    </form>
  );

  const formShow = (
    <form className="flex max-w-full flex-col gap-4 w-96">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        {isLoading ? (
          <Skeleton height="41.6px" borderRadius={8} />
        ) : (
          <TextInput
            id="name"
            type="name"
            placeholder="sfwn mhmd"
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
        )}
        <small className="text-red-600">{errors?.name?.message}</small>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        {isLoading ? (
          <Skeleton height="41.6px" borderRadius={8} />
        ) : (
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
        )}
        <small className="text-red-600">{errors?.email?.message}</small>
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="role" value="Role" />
        </div>
        {isLoading ? (
          <Skeleton height="41.6px" borderRadius={8} />
        ) : (
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
        )}
        <small className="text-red-600">{errors?.role?.message}</small>
      </div>
      <Btn
        text="Update"
        color="blue"
        size="sm"
        type="submit"
        isValid={isValid}
        isLoading={isPending}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );

  return (
    <div className="flex items-center justify-center w-full">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Update user: {id}</h1>
        <hr className="border-gray-500 mb-2" />
        {isLoading ? formLoading : formShow}
      </div>
    </div>
  );
};

export default UpdateUser;
