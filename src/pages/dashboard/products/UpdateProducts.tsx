import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import Btn from "../../../components/Btn";
import CategoriesOption from "../../../components/CategoriesOption";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddProductYupSchema } from "../../../utils/yupSchema";
import useGetSingleData from "../../../hooks/use-get-single-data";
import { AXIOS, PRODUCT } from "../../../utils/AXIOS";
import { useParams } from "react-router-dom";
import { shortTheText } from "../../../utils/utils";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const UpdateProducts = () => {
  const [images, setImages] = useState([]);

  const { id } = useParams();

  const { data, isLoading, isError, refetch } = useGetSingleData(
    PRODUCT,
    id as string
  );
  const productData = data?.data[0];

  console.log(productData);
  const progressRef = useRef([]);
  const progressIdxRef = useRef(0);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(AddProductYupSchema),
    values: {
      ...productData,
    },
  });

  useEffect(() => {
    progressIdxRef.current = getValues("images")?.length - 1;
    console.log(
      "=====================================",
      progressIdxRef.current
    );
  }, [id, getValues("images")]);

  const { mutateAsync } = useMutation({
    mutationKey: ["deleteProductImage"],
    mutationFn: async (id: string) => await AXIOS.delete(`/product-img/${id}`),
  });

  const handleRemoveImage = async (id: string) => {
    try {
      const res = await toast.promise(mutateAsync(id), {
        pending: "deleting",
        success: "deleted",
        error: "failed to delete",
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImages = async (e) => {
    const FD = new FormData();
    const imagesList = e.target.files;
    setImages((prev) => [...prev, ...imagesList]);

    for (let i = 0; i < imagesList.length; i++) {
      try {
        FD.append("image", imagesList[i]);
        FD.append("product_id", id);
        const res = await toast.promise(
          AXIOS.post("/product-img/add", FD, {
            onUploadProgress: (ProgressEvent) => {
              const { loaded, total } = ProgressEvent;
              const percent = Math.floor((loaded / total) * 100);

              progressRef.current[progressIdxRef.current].style.width =
                percent + "%";
              progressRef.current[progressIdxRef.current].setAttribute(
                "percent-data",
                percent
              );
            },
          })
        );
        // await refetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // image loading DOM
  const showImages = (
    <div className="grid grid-cols-6 gap-4">
      {getValues("images")?.map((img, idx) => (
        <div
          key={img?.image}
          className="flex gap-4 border rounded-sm p-1 w-fit justify-center"
        >
          <div className="flex gap-2 flex-col items-center">
            <Button
              className="group w-full"
              color="red"
              onClick={() => handleRemoveImage(img?.id)}
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
              {shortTheText(img?.image?.split("/").pop(), 10)}
            </small>
          </div>
        </div>
      ))}
    </div>
  );

  console.log("the idx", progressRef.current);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Create user</h1>
        <hr className="border-gray-500 mb-2" />
        <form className="flex max-w-md flex-col gap-4">
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Select your country" />
            </div>
            <Select id="countries" required>
              <CategoriesOption />
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="title" />
            </div>
            <TextInput
              id="title"
              type="text"
              placeholder="text"
              required
              {...register("title")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="description" />
            </div>
            <TextInput
              id="description"
              type="text"
              placeholder="description"
              required
              {...register("description")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="price" />
            </div>
            <TextInput
              id="price"
              type="number"
              placeholder="price"
              required
              {...register("price")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="discount" value="discount" />
            </div>
            <TextInput
              id="discount"
              type="number"
              placeholder="discount"
              required
              {...register("discount")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="about" value="about" />
            </div>
            <TextInput
              id="about"
              type="text"
              placeholder="about"
              required
              {...register("about")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="file-upload" value="Upload file" />
            </div>
            <FileInput id="file-upload" onChange={handleImages} multiple />
          </div>
          {showImages}
          <Btn
            text="Update"
            size="sm"
            outline={false}
            type="submit"
            isLoading={false}
            isValid={true}
            onClick={() => "nont"}
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
