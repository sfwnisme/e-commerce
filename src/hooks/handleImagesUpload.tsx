import React from "react";
import { AXIOS } from "../utils/AXIOS";

interface Image {
  url: string;
  name: string;
}

type ParamsTypes = (
  e: React.ChangeEvent<HTMLInputElement>,
  productId: string,
  setImages: React.Dispatch<React.SetStateAction<Image[]>>,
  progressRef: React.MutableRefObject<never[]>,
  progressIdxRef: React.MutableRefObject<number>,
  idsRef: React.MutableRefObject<number[]>
) => Promise<void>;

export const handleImagesUpload: ParamsTypes = async (
  e,
  productId,
  setImages,
  progressRef,
  progressIdxRef,
  idsRef
) => {
  const FD = new FormData();
  const imagesList = (e.target as HTMLInputElement).files as FileList;
  setImages((prev) => [...prev, ...imagesList]);

  for (let i = 0; i < imagesList.length; i++) {
    FD.append("image", imagesList[i]);
    FD.append("product_id", productId);
    try {
      const res = await AXIOS.post(`/product-img/add`, FD, {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          const percent = Math.floor((loaded / total!) * 100);
          if (percent % 10 === 0) {
            progressRef.current[progressIdxRef.current].style.width = `${
              percent + "%"
            }`;
            progressRef.current[progressIdxRef.current].setAttribute(
              "percent-data",
              `${percent + "%"}`
            );
          }
        },
      });

      // change the freeze statement if it reached the last image uploading
      // if (i === imagesList.length - 1) {
      //   console.log("last image uploaded");
      //   imageInputRef.current.value = "";
      // }
      progressIdxRef.current++;
      idsRef.current.push(res?.data?.id);
    } catch (error) {
      console.log(error);
    }
  }
};
