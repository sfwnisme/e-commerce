import { FileInput, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { AddCategoryYupSchema } from "../../../utils/yupSchema";
import { ErrorResponseType } from "../../../types/Types";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AXIOS, CATEGORY } from "../../../utils/AXIOS";
import useGetSingleData from "../../../hooks/use-get-single-data";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import { toast } from "react-toastify";
import Btn from "../../../components/Btn";
import Skeleton from "react-loading-skeleton";
import { ICategoryAdd } from "../../../queries/Queries";

const UpdateCategory = () => {
  const [image, setImage] = useState<File | null>(null);
  const { id } = useParams();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["updateCategory", id],
    mutationFn: async (data: FormData) =>
      await AXIOS.post(`${CATEGORY}/edit/${id}`, data),
  });

  const { data, isLoading, isError } = useGetSingleData(CATEGORY, id);
  const categoryData = data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<ICategoryAdd>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver<ICategoryAdd>(AddCategoryYupSchema),
    values: {
      title: isLoading
        ? "loading..."
        : isError && !isLoading
        ? "error!"
        : categoryData?.title,
    },
  });

  const onSubmit: SubmitHandler<ICategoryAdd> = async (data) => {
    const FD = new FormData();
    FD.append("image", image as File);
    FD.append("title", data?.title);
    try {
      const res = await mutateAsync(FD);
      toast.success("The category has been udpated successfully");
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(ServerErrorResponse(error as ErrorResponseType));
    }
  };

  const formLoading = (
    <form className="flex md:w-96 flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="image" value="Upload image" />
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
    <form
      className="flex md:w-96 flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        {isLoading ? (
          <Skeleton height="41.6px" borderRadius={8} width={250} />
        ) : (
          <TextInput
            id="title"
            type="text"
            required
            shadow
            color={
              getValues("title")
                ? errors?.title?.message
                  ? "failure"
                  : "success"
                : "default"
            }
            {...register("title")}
          />
        )}
      </div>
      <small className="text-red-600">{errors?.title?.message}</small>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="image" value="Upload image" />
        </div>
        {isLoading ? (
          <Skeleton height="41.6px" borderRadius={8} width={250} />
        ) : (
          <FileInput
            id="image"
            {...register("image", {
              onChange: (e) => setImage(e?.target?.files[0]),
            })}
          />
        )}
      </div>
      <small className="text-red-600">{errors?.image?.message}</small>
      <Btn
        text="Update"
        color="blue"
        size="sm"
        type="submit"
        isValid={isValid}
        isLoading={isPending}
      />
    </form>
  );

  return (
    <div className="flex items-center justify-center w-full">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Update category</h1>
        <hr className="border-gray-500 mb-2" />
        {isLoading ? formLoading : formShow}
      </div>
    </div>
  );
};

export default UpdateCategory;
