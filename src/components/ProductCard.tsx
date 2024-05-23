import { Badge, Button } from "flowbite-react";
import { dummyArray, shortTheText } from "../utils/utils";
import { NavLink } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FiStar } from "react-icons/fi";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { FaFontAwesome } from "react-icons/fa";
interface IProduct {
  id?: number;
  image?: string;
  title: string;
  description?: string;
  price?: number;
  discount?: number;
  rating?: number;
  ratings_number?: number;
}
const ProductCard = (props: IProduct) => {
  const {
    id,
    image,
    title,
    description,
    price,
    discount,
    rating,
    ratings_number,
  } = props;

  const ratingStars = () => {
    const highestStars = 5; // initial highest rating number
    const positiveStars = Math.floor(Number(rating)); // the current rating number
    const negativeStars = Math.abs(
      Math.floor(Number(positiveStars) - Number(highestStars))
    ); // the number of unrated star positions

    const positiveStarsDOM = dummyArray(positiveStars)?.map((_, idx) => (
      <IoStar color="gold" key={idx} />
    ));
    const negativeStarsDOM = dummyArray(negativeStars)?.map((_, idx) => (
      <IoStarOutline color="black" key={idx} />
    ));

    return (
      <div className="flex items-center">
        {positiveStarsDOM} {negativeStarsDOM}
        <Badge color="blue" className="ml-2 inline">
          {rating}
        </Badge>
        <small className="ml-1">({ratings_number} ratings)</small>
      </div>
    );
  };

  ratingStars();

  const showTheProductCard = (
    <div
      className="grid place-items-center gap-2 bg-white border border-gray-200 rounded p-2 cursor-pointer hover:shadow-md duration-150"
      title={title}
      key={id}
    >
      <img
        src={image}
        alt={title}
        title={title}
        className="self-start w-full h-auto aspect-square object-contain"
      />
      <div className="grid gap-2 w-full self-end h-full">
        <NavLink
          to={`/products/${id}`}
          className="self-start max-sm:text-sm hover:text-blue-500 duration-75"
        >
          {shortTheText(title, 40)}
        </NavLink>
        <small className="text-gray-400 font-light">
          {shortTheText(description, 50)}
        </small>
        <h3>{ratingStars()}</h3>
        <div className="w-full self-end">
          <h3 className="mb-2 font-medium">
            {price}
            <sup className="ml-1">SAR</sup>
          </h3>
          <h3 className="mb-2 font-medium">
            {discount}
            <sup className="ml-1">SAR</sup>
          </h3>
          <Button color="gray" outline size="sm" className="w-full">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );

  return showTheProductCard;
};

export default ProductCard;
