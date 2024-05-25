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
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useGetCurrentUser } from "../../../hooks/use-get-current-user";
import { ICategoryAdd } from "../../../queries/Queries";

const AddCategory = () => {
  // const [setImage] = useState<File | null>(null);
  const FD = new FormData();
  const navigate = useNavigate();

  const { isLoading } = useGetCurrentUser();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AddCategory"],
    mutationFn: async (data: ICategoryAdd) =>
      await AXIOS.post(`${CATEGORY}/add`, data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICategoryAdd>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver<ICategoryAdd>(AddCategoryYupSchema),
  });

  const onSubmit: SubmitHandler<ICategoryAdd> = async (data) => {
    console.log("|||||||||||||||||||||", data?.image?.[0]);
    if (data?.image) {
      const imageFile = data?.image?.[0];
      FD.append("image", imageFile);
    }
    FD.append("title", data.title);
    try {
      const res = await toast.promise(mutateAsync(FD), {
        pending: "creating",
        success: "created",
        error: "error",
      });
      // toast.success("You have successfully added category");
      navigate("/dashboard/categories");
      console.log(res);
    } catch (error) {
      toast.error(ServerErrorResponse(error as ErrorResponseType));
      console.log(error);
    }
  };

  const formLoading = (
    <form className="flex md:w-96 flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category tilte" value="Title" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="upload image" value="Upload image" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <Btn
        text="Update"
        size="sm"
        color="blue"
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
        <TextInput id="title" type="text" shadow {...register("title")} />
      </div>
      <small className="text-red-600">{errors?.title?.message}</small>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="image" value="Upload image" />
        </div>
        <FileInput
          id="image"
          {...register("image")}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          // setImage(e.target.files[0])
          // }
        />
      </div>
      {/* <small className="text-red-600">{errors?.category?.message}</small> */}

      <Btn
        text="Add"
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

export default AddCategory;
