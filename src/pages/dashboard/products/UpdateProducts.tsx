import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import Btn from "../../../components/Btn";
import CategoriesOption from "../../../components/CategoriesOption";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddProductYupSchema } from "../../../utils/yupSchema";
import useGetSingleData from "../../../hooks/use-get-single-data";
import { AXIOS, PRODUCT } from "../../../utils/AXIOS";
import { useNavigate, useParams } from "react-router-dom";
import { shortTheText } from "../../../utils/utils";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AddProductInputs, ErrorResponseType } from "../../../types/Types";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import Skeleton from "react-loading-skeleton";
import { handleImagesUpload } from "../../../hooks/handleImagesUpload";

//======================
interface FileData {
  name: string;
  size?: number;
  type?: string;
}

const UpdateProductRequest = async (id: number, data: AddProductInputs) =>
  await AXIOS.post(`${PRODUCT}/edit/${id}`, data);

const UpdateProducts = () => {
  const [images, setImages] = useState<FileData[]>([]);
  const [deletedImgsIds, setDeletedImgsIds] = useState<number[]>([]);
  const [oldImgs, setOldImgs] = useState<
    { name: string; id: number; image: string }[]
  >([]);
  const { id } = useParams<string>();
  const productId = id!;
  console.log(productId);
  const navigate = useNavigate();
  // refs
  const progressRef = useRef([]);
  const progressIdxRef = useRef(0);
  const idsRef = useRef<number[]>([]);

  //==============================
  const { data, isLoading } = useGetSingleData(PRODUCT, id as string);
  const productData = data?.data[0];

  //==============================
  useEffect(() => {
    setOldImgs(productData?.images);
  }, [data]);
  console.log("=================product images", productData?.images);

  //==============================
  const { mutateAsync: mutateAsyncDelete } = useMutation({
    mutationKey: ["deleteProductImage"],
    mutationFn: async (id: number) => await AXIOS.delete(`/product-img/${id}`),
  });

  //==============================
  const { mutateAsync: mutateAsyncUpdate, isPending } = useMutation({
    mutationKey: ["update Product", id],
    mutationFn: async (data: AddProductInputs) =>
      await UpdateProductRequest(Number(id), data),
  });

  //==============================
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(AddProductYupSchema),
    values: {
      ...productData,
    },
  });

  //==============================
  const onSubmit: SubmitHandler<AddProductInputs> = async (data) => {
    console.log("data", data);
    try {
      for (let i = 0; i < deletedImgsIds.length; i++) {
        await mutateAsyncDelete(deletedImgsIds[i]);
      }
      await toast.promise(mutateAsyncUpdate(data), {
        pending: "updating",
        success: "updated",
        error: "could not update",
      });
      navigate("/dashboard/products");
    } catch (error) {
      toast.error(ServerErrorResponse(error as ErrorResponseType));
      console.log(ServerErrorResponse(error as ErrorResponseType));
      console.log(error);
    }
  };

  //==============================
  const handleRemoveOldImage = async (id: number) => {
    setDeletedImgsIds((prev) => [...prev, id]);
    setOldImgs((prev) => prev?.filter((img: { id: number }) => img?.id !== id));
    toast.success("deleted");
  };

  //==============================
  const handleRemoveNewImage = async (image: File, imgIdx: number) => {
    const findId = idsRef.current[imgIdx];
    try {
      await toast.promise(mutateAsyncDelete(findId), {
        pending: "deleting",
        success: "deleted",
        error: "failed to delete",
      });
      setImages((prev) => prev?.filter((img) => img !== image));
      progressRef.current.splice(imgIdx, 1);
      progressIdxRef.current--;
      idsRef.current.splice(imgIdx, 1);
      // refetch();
    } catch (error) {
      console.log(error);
    }
  };

  //===============================
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleImagesUpload(
      e,
      productId,
      setImages,
      progressRef,
      progressIdxRef,
      idsRef
    );

  // image loading DOM
  const showOldImages = (
    <div className="grid grid-cols-4 gap-1">
      {oldImgs?.map((img: { name: string; id: number; image: string }) => (
        <div
          key={img?.id}
          className="flex gap-4 border rounded-sm p-1 justify-center"
        >
          <div className="flex gap-2 flex-col items-center">
            <Button
              className="group w-full"
              color="red"
              onClick={() => handleRemoveOldImage(img?.id)}
              size="xs"
              // disabled={frzToEnd}
            >
              <AiOutlineClose className="group-hover:text-red-500 cursor-pointer h-3 w-3" />
            </Button>
            <img
              className="w-10 aspect-square"
              src={img?.image}
              alt=""
              title=""
            />
            <small
              className="flex-1 text-[11px]"
              title={img?.image?.split("/").pop()}
            >
              {shortTheText(img?.image?.split("/").pop() || "", 10)}
            </small>
          </div>
        </div>
      ))}
    </div>
  );

  const showNewImages = (
    <div className="grid grid-cols-4 gap-1">
      {images?.map((image, idx) => (
        <div
          key={idx}
          className="flex flex-col border rounded-sm p-4 w-full"
          id={idsRef?.current[idx]}
        >
          <Button
            className="group self-start w-full"
            color="red"
            onClick={() => handleRemoveNewImage(image, idx)}
            // disabled={frzToEnd}
          >
            <AiOutlineClose className="group-hover:text-red-500 cursor-pointer h-3 w-3" />
          </Button>
          <img
            className="w-full aspect-square"
            src={URL.createObjectURL(image)}
            alt=""
            title=""
          />
          <small className="text-[11px]" title={image?.name}>
            {shortTheText(image?.name, 10)}
          </small>
          <span
            ref={(e) => (progressRef.current[idx] = e)}
            className={`PROGRESS h-1 w-0 bg-red-500 rounded-sm relative transition duration-1000`}
            percent-data="0%"
          ></span>
        </div>
      ))}
    </div>
  );

  console.log(errors);

  const formLoading = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex md:w-96 flex-col gap-4"
    >
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="categories" value="Category" />
        </div>
        <Skeleton height={"42px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <Skeleton height={"42px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Skeleton height={"42px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price" />
        </div>
        <Skeleton height={"42px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="discount" value="Discount" />
        </div>
        <Skeleton height={"42px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="about" value="About" />
        </div>
        <Skeleton height={"42px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="file-upload" value="Upload new images" />
        </div>
        <Skeleton height={"42px"} borderRadius={8} />
      </div>
      <div className="grid grid-cols-4 gap-1">
        <Skeleton height={"100px"} borderRadius={8} />
        <Skeleton height={"100px"} borderRadius={8} />
        <Skeleton height={"100px"} borderRadius={8} />
        <Skeleton height={"100px"} borderRadius={8} />
      </div>
      <Btn
        text="Update"
        color="blue"
        size="sm"
        outline={false}
        type="submit"
        isLoading={isPending}
        isValid={isValid}
      />
      {showNewImages}
    </form>
  );

  const formShow = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex md:w-96 flex-col gap-4"
    >
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="categories" value="Category" />
        </div>
        {isLoading ? (
          <Skeleton height={"42px"} borderRadius={8} />
        ) : (
          <Select
            id="categories"
            required
            {...register("category")}
            color={
              getValues("category")
                ? errors?.category?.message
                  ? "failure"
                  : "success"
                : "default"
            }
          >
            <CategoriesOption />
          </Select>
        )}
        <small className="text-red-600">{errors?.category?.message}</small>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="text"
          required
          color={
            getValues("title")
              ? errors?.title?.message
                ? "failure"
                : "success"
              : "default"
          }
          {...register("title")}
        />
        <small className="text-red-600">{errors?.title?.message}</small>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <TextInput
          id="description"
          type="text"
          placeholder="description"
          required
          color={
            getValues("description")
              ? errors?.description?.message
                ? "failure"
                : "success"
              : "default"
          }
          {...register("description")}
        />
        <small className="text-red-600">{errors?.description?.message}</small>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price" />
        </div>
        <TextInput
          id="price"
          type="number"
          placeholder="price"
          required
          color={
            getValues("price")
              ? errors?.price?.message
                ? "failure"
                : "success"
              : "default"
          }
          {...register("price")}
        />
        <small className="text-red-600">{errors?.price?.message}</small>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="discount" value="Discount" />
        </div>
        <TextInput
          id="discount"
          type="number"
          placeholder="discount"
          required
          color={
            getValues("discount")
              ? errors?.discount?.message
                ? "failure"
                : "success"
              : "default"
          }
          {...register("discount")}
        />
        <small className="text-red-600">{errors?.discount?.message}</small>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="about" value="About" />
        </div>
        <TextInput
          id="about"
          type="text"
          placeholder="about"
          required
          color={
            getValues("About")
              ? errors?.About?.message
                ? "failure"
                : "success"
              : "default"
          }
          {...register("About")}
        />
        <small className="text-red-600">{errors?.About?.message}</small>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="file-upload" value="Upload new images" />
        </div>
        <FileInput id="file-upload" onChange={handleImages} multiple />
      </div>
      {showOldImages}
      <Btn
        text="Update"
        color="blue"
        size="sm"
        outline={false}
        type="submit"
        isLoading={isPending}
        isValid={isValid}
      />
      {showNewImages}
    </form>
  );

  return (
    <div className="flex items-center justify-center w-full">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Update Product</h1>
        <hr className="border-gray-500 mb-2" />
        {isLoading ? formLoading : formShow}
      </div>
    </div>
  );
};

export default UpdateProducts;
