import { Badge, Button } from "flowbite-react";
import { shortTheText } from "../utils/utils";
import { NavLink } from "react-router-dom";
interface IProduct {
  id: number;
  image: string;
  title: string;
  price: number;
}
const ProductCard = (props: IProduct) => {
  const { id, image, title, price } = props;

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
        <NavLink to={`/products/${id}`} className="self-start max-sm:text-sm">
          {shortTheText(title, 40)}
        </NavLink>
        <h3>
          *****
          <Badge color="blue" className="ml-2 inline">
            5.0
          </Badge>
        </h3>
        <div className="w-full self-end">
          <h3 className="mb-2 font-medium">
            {price}
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
