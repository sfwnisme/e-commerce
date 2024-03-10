import { FileInput, Label, TextInput } from "flowbite-react";
import Btn from "../../../components/Btn";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddCategoryYupSchema } from "../../../utils/yupSchema";
import { useMutation } from "@tanstack/react-query";
import { AXIOS, CATEGORY } from "../../../utils/AXIOS";
import { ErrorResponseType } from "../../../types/Types";
import { toast } from "react-toastify";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import { useState } from "react";

interface Inputs {
  title: string;
  image?: File;
}
const AddCategory = () => {
  const [image, setImage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AddCategory"],
    mutationFn: async (data: Inputs) =>
      await AXIOS.post(`${CATEGORY}/add`, data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(AddCategoryYupSchema),
  });

  console.log("watcher", watch());
  const FD = new FormData();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("|||||||||||||||||||||", data?.image?.[0]);
    if (data?.image) {
      const imageFile = data?.image?.[0] as File;
      FD.append("image", imageFile);
    }
    FD.append("title", data.title);
    try {
      const res = await mutateAsync(FD);
      toast.success("You have successfully added category");
      console.log(res);
    } catch (error) {
      toast.error(ServerErrorResponse(error as ErrorResponseType));
      console.log(error);
    }
  };

  console.log("image,", image);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Create category</h1>
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
              {...register("title")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="image" value="Upload image" />
            </div>
            <FileInput
              id="image"
              {...register("image", {
                onChange: (e) => setImage(e?.target?.files[0]),
              })}
              onChange={(e) => setImage(e?.target?.files[0])}
            />
          </div>
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

export default AddCategory;
