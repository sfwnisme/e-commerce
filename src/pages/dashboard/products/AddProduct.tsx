import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddProductYupSchema } from "../../../utils/yupSchema";
import { AddProductInputs } from "../../../types/Types";
import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import CategoriesOption from "../../../components/CategoriesOption";
import Btn from "../../../components/Btn";
import { AXIOS, PRODUCT } from "../../../utils/AXIOS";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { shortTheText } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useGetCurrentUser } from "../../../hooks/use-get-current-user";
import { useMutation } from "@tanstack/react-query";
import { handleImagesUpload } from "../../../hooks/handleImagesUpload";
//======================
interface FileData {
  name: string;
  size?: number;
  type?: string;
}

interface Dummy {
  category: null;
  title: string;
  description: string;
  price: number;
  discount: number;
  About: string;
}
//=======================

const AddProduct = () => {
  const [sendDummy, setSendDummy] = useState(false);
  const [images, setImages] = useState<FileData[]>([]);
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();
  // const [percent, setPercent] = useState([]);
  const [dummyForm] = useState<Dummy>({
    category: null,
    title: "dummy",
    description: "dummy",
    price: 1000,
    discount: 10,
    About: "dummy",
  });

  // refs
  const progressRef = useRef<never[]>([]);
  const progressIdxRef = useRef(0);
  const idsRef = useRef<number[]>([]);
  const imageInputRef = useRef(null);

  console.log(progressRef.current);

  // current user
  const { data, isLoading, isError } = useGetCurrentUser();
  const currentUser = data?.data?.name;

  console.log(currentUser);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    watch,
  } = useForm<AddProductInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(AddProductYupSchema),
  });

  //=============================
  // edit the dummy data how has the {productId} saved from the {handleDummyForm} function
  const { mutateAsync: mutateAsyncEdit } = useMutation({
    mutationKey: ["product"],
    mutationFn: async (data: AddProductInputs) =>
      await AXIOS.post(`${PRODUCT}/edit/${productId}`, data),
  });
  const onSubmit: SubmitHandler<AddProductInputs> = async (data) => {
    try {
      const res = await toast.promise(mutateAsyncEdit(data), {
        pending: "creating product",
        success: "product created",
        error: "could not create the product",
      });
      console.log(res);
      // location.pathname = "/dashboard/products";
      navigate(`/dashboard/products`);
    } catch (error) {
      console.log(error);
    }
  };

  //=======================
  // add dummy data on change of the categories selection input
  const { mutateAsync } = useMutation({
    mutationKey: ["dummyProduct"],
    mutationFn: async (data: Dummy) => await AXIOS.post(`${PRODUCT}/add`, data),
  });

  const handleDummyForm = async () => {
    setSendDummy(true);
    try {
      const res = await mutateAsync(dummyForm);
      setProductId(`${res?.data?.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeDummy = async () => {
    sendDummy ? null : handleDummyForm();
  };

  //========================
  const { mutateAsync: mutateAsyncRemove } = useMutation({
    mutationKey: ["removeProductsImage"],
    mutationFn: async (id: string) => await AXIOS.delete(`/product-img/${id}`),
  });

  const handleRemove = async (imgId, image, imgIdx) => {
    const findImgId = idsRef.current[imgIdx];
    console.log(findImgId);
    try {
      await toast.promise(mutateAsyncRemove(imgId || findImgId), {
        pending: "deleting",
        success: "deleted",
        error: "could not deleted",
      });
      setImages((prev) => prev.filter((img) => img !== image));
      // update the deleted image ref references
      progressIdxRef.current--;
      progressRef.current.splice(imgIdx, 1);
      idsRef.current.splice(imgIdx, 1);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(productId);

  // handle the image API data posting
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleImagesUpload(
      e,
      productId,
      setImages,
      progressRef,
      progressIdxRef,
      idsRef
    );

  console.log("images", images);
  console.log("ids ref", idsRef.current);

  // image loading DOM
  const showImages = (
    <div className="grid grid-cols-4 gap-1">
      {images?.map((image, idx) => (
        <div
          key={idsRef?.current[idx]}
          className="flex flex-col border rounded-sm p-4 w-full"
          id={idsRef?.current[idx]}
        >
          <Button
            className="group self-start w-full"
            color="red"
            onClick={() => handleRemove(idsRef?.current[idx], image, idx)}
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
            {shortTheText(image?.name, 20)}
          </small>
          <span
            ref={(e) => (progressRef.current[idx] = e)}
            className={`PROGRESS h-1 w-0 bg-red-500 rounded-sm relative transition duration-1000`}
            // percent-data="0%"
          ></span>
        </div>
      ))}
    </div>
  );

  const formLoading = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex md:w-96 flex-col gap-4"
    >
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="categories" value="Category" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="discount" value="Discount" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="about" value="About" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="file-upload" value="Upload images" />
        </div>
        <Skeleton height={"41.6px"} borderRadius={8} />
      </div>
      <Btn
        text="Add"
        color="blue"
        size="sm"
        outline={false}
        type="submit"
        isLoading={false}
        isValid={isValid}
      />
    </form>
  );

  const formShow = (
    <form
      className="flex md:w-96 flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="categories" value="Category" />
        </div>
        <Select
          id="categories"
          required
          color={
            getValues("category")
              ? errors?.category?.message
                ? "failure"
                : "success"
              : "default"
          }
          {...register("category")}
          onChange={handleChangeDummy}
        >
          <CategoriesOption />
        </Select>
        <small className="text-red-600">{errors?.category?.message}</small>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="title"
          required
          disabled={!sendDummy}
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
          disabled={!sendDummy}
          shadow
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
          disabled={!sendDummy}
          shadow
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
          disabled={!sendDummy}
          shadow
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
          <Label htmlFor="About" value="About" />
        </div>
        <TextInput
          id="About"
          type="text"
          placeholder="About"
          required
          disabled={!sendDummy}
          shadow
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
          <Label htmlFor="file-upload" value="Upload images" />
        </div>
        <FileInput
          id="file-upload"
          disabled={!sendDummy}
          multiple
          onChange={handleImages}
          ref={imageInputRef}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">{showImages}</div>
      <Btn
        text="Add"
        color="blue"
        size="sm"
        type="submit"
        isValid={sendDummy}
        isLoading={false}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );

  return (
    <div className="flex items-center justify-center w-full">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Create Product</h1>
        <hr className="border-gray-500 mb-2" />
        {isLoading ? formLoading : formShow}
      </div>
    </div>
  );
};

export default AddProduct;

// category: 'Select Category',
// title: '',
// description: '',
// price: '',
// discount: '',
// About: '',
