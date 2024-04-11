import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AddProductYupSchema } from "../../../utils/yupSchema";
import { AddProductInputs } from "../../../types/Types";
import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import CategoriesOption from "../../../components/CategoriesOption";
import Btn from "../../../components/Btn";
import { AXIOS, PRODUCT } from "../../../utils/AXIOS";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [sendDummy, setSendDummy] = useState(false);
  const [images, setImages] = useState([]);
  const [productId, setProductId] = useState("");
  const [frzToEnd, setFrzToEnd] = useState(false);
  // const [percent, setPercent] = useState([]);
  const [dummyForm, setDummyForm] = useState({
    category: null,
    title: "dummy",
    description: "dummy",
    price: 1000,
    discount: 10,
    About: "dummy",
  });

  // refs
  const progressRef = useRef([]);
  const progressIdxRef = useRef(0);
  const idsRef = useRef([]);
  const imageInputRef = useRef(null);

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

  // edit the dummy data how has the {productId} saved from the {handleDummyForm} function
  const onSubmit = async (data) => {
    setFrzToEnd(true);
    try {
      const res = await toast.promise(
        AXIOS.post(`${PRODUCT}/edit/${productId}`, data),
        {
          pending: "creating product",
          success: "product created",
          error: "could not create the product",
        }
      );
      console.log(res);
      location.pathname = "/dashboard/products";
    } catch (error) {
      console.log(error);
    } finally {
      setFrzToEnd(false);
    }
  };

  // add dummy data on change of the categories selection input
  const handleDummyForm = async () => {
    setSendDummy(true);
    setFrzToEnd(true);
    try {
      const res = await AXIOS.post(`${PRODUCT}/add`, dummyForm);
      setProductId(res?.data?.id);
    } catch (error) {
      console.log(error);
    } finally {
      setFrzToEnd(false);
    }
  };

  const handleChangeDummy = async () => {
    sendDummy ? null : handleDummyForm();
  };

  const handleRemove = async (imgId, image, imgIdx) => {
    const findImgId = idsRef.current[imgIdx];
    console.log(findImgId);
    setFrzToEnd(true);
    try {
      await toast.promise(AXIOS.delete(`/product-img/${imgId || findImgId}`), {
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
    } finally {
      setFrzToEnd(false);
    }
  };

  // handle the image API data posting
  const handleImages = async (e) => {
    const FD = new FormData();
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesList = e.target.files;
    setFrzToEnd(true);
    for (let i = 0; i < imagesList.length; i++) {
      FD.append("image", imagesList[i]);
      FD.append("product_id", productId);
      try {
        const res = await toast.promise(
          AXIOS.post(`/product-img/add`, FD, {
            onUploadProgress: (ProgressEvent) => {
              const { loaded, total } = ProgressEvent;
              const percent = Math.floor((loaded / total) * 100);
              if (loaded > 10) {
                progressRef.current[progressIdxRef.current].style.width =
                  percent + "%";
                progressRef.current[progressIdxRef.current].setAttribute(
                  "percent-data",
                  percent
                );
              }
            },
          }),
          {
            pending: "uploading",
            success: "uploaded",
            error: "could not upload",
          }
        );
        progressIdxRef.current++;

        // change the freeze statement if it reached the last image uploading
        if (i === imagesList.length - 1) {
          setFrzToEnd(false);
          console.log("last image uploaded");
          imageInputRef.current.value = "";
        }
        console.log(res);
        idsRef.current.push(res?.data?.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log("images", images);
  console.log("ids ref", idsRef.current);

  // image loading DOM
  const showImages = images?.map((image, idx) => (
    <div
      key={image}
      className="flex flex-wrap gap-4 border rounded-sm p-4"
      id={idsRef?.current[idx]}
    >
      <div className="flex gap-2  w-full">
        <img
          className="w-20 aspect-square mr-2 "
          src={URL.createObjectURL(image)}
          alt=""
          title=""
        />
        <small className="flex-1">{image?.name}</small>
        <Button
          className="group self-start"
          color="red"
          onClick={() => handleRemove(idsRef?.current[idx], image, idx)}
          disabled={frzToEnd}
        >
          <AiOutlineClose className="group-hover:text-red-500 cursor-pointer h-5 w-5" />
        </Button>
      </div>
      <span
        ref={(e) => (progressRef.current[idx] = e)}
        className={`PROGRESS h-2 bg-red-500 rounded-sm relative transition duration-1000`}
        // style={{ width: percent + "%" }}
        percent-data=""
      >
        {/* <div className="bg-red-800"></div> */}
      </span>
    </div>
  ));

  return (
    <div className="flex items-center justify-center w-full">
      <div className="">
        <h1 className="text-xl font-bold mb-2">Create user</h1>
        <hr className="border-gray-500 mb-2" />
        <form
          className="flex max-w-full flex-col gap-4 w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="categories" value="Select the category" />
            </div>
            <Select
              id="categories"
              required
              // disabled={!sendDummy}
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
              <Label htmlFor="title" value="title" />
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
              <Label htmlFor="description" value="description" />
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
            <small className="text-red-600">
              {errors?.description?.message}
            </small>
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
              <Label htmlFor="discount" value="discount" />
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
              disabled={!sendDummy || frzToEnd}
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
            isValid={sendDummy && !frzToEnd}
            isLoading={false}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
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
