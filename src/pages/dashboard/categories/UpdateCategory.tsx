import { FileInput, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { AddCategoryYupSchema } from "../../../utils/yupSchema";
import { AddCategoryInputs, ErrorResponseType } from "../../../types/Types";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AXIOS, CATEGORY } from "../../../utils/AXIOS";
import useGetSingleData from "../../../hooks/use-get-single-data";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import { toast } from "react-toastify";
import Btn from "../../../components/Btn";

const UpdateCategory = () => {
  const [image, setImage] = useState<File | null>(null);
  const { id } = useParams();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["updateCategory", id],
    mutationFn: async (data: AddCategoryInputs) =>
      await AXIOS.post(`${CATEGORY}/edit/${id}`, data),
  });

  const {
    data: categoryData,
    isLoading,
    isError,
  } = useGetSingleData(CATEGORY, id as string);

  console.log("categoryData", categoryData?.data?.title);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    watch,
  } = useForm<AddCategoryInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(AddCategoryYupSchema),
    values: {
      // ...categoryData?.data,
      title: isLoading
        ? "loading..."
        : isError && !isLoading
        ? "error!"
        : categoryData?.data?.title,
    },
  });

  console.log("watching.....................", watch());
  console.log("image", image);

  // useEffect(() => {
  //   setValue("title", categoryData?.data?.title);
  //   setValue("image", categoryData?.data?.image);
  //   console.log("------------------------", getValues("image"));
  // }, [id, categoryData, setValue]);

  const onSubmit: SubmitHandler<AddCategoryInputs> = async (data) => {
    const FD = new FormData();
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%", data?.image);
    FD.append("image", image as File);
    FD.append("title", data?.title);

    try {
      const res = await mutateAsync(FD);
      toast.success("The category has been udpated successfully");
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(ServerErrorResponse(error as ErrorResponseType));
      console.log(ServerErrorResponse(error as ErrorResponseType));
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Update user: {id}</h1>
        <hr className="border-gray-500 mb-2" />
        <form
          className="flex max-w-md flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="category title" />
            </div>
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
          </div>
          <small className="text-red-600">{errors?.title?.message}</small>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="image" value="Upload image" />
            </div>
            <FileInput
              id="image"
              {...register("image", {
                onChange: (e) => setImage(e?.target?.files[0]),
              })}
            />
          </div>
          <small className="text-red-600">{errors?.image?.message}</small>
          <Btn
            text="Add"
            color="blue"
            size="sm"
            type="submit"
            isValid={isValid}
            isLoading={isPending}
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
