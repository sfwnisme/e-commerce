import React from "react";

interface Props {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  color?: string;
}

const Skele = (props: Props) => {
  let { width, height, radius, color } = props;
  width = width + "px" || "full";
  height = height + "px" || "42px";
  radius = radius + "px" || "3px";
  color = color || "gray";

  // console.log(width);

  return (
    <div
      // className={`w-[${width}] h-${height} rounded-${radius || "5px"} bg-${
      //   color || "red-500"
      // }`}
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: color,
      }}
    >
      Skele
    </div>
  );
};

export default Skele;
