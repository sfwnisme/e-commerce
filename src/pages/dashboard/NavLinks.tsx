import { IconType } from "react-icons";
import {
  HiChartPie,
  HiTicket,
  HiUserAdd,
  HiUsers,
  HiViewGridAdd,
} from "react-icons/hi";
import { HiListBullet } from "react-icons/hi2";
interface NavLinksTypes {
  name: string;
  path: string;
  icon: IconType;
}
export const NavLinks: NavLinksTypes[] = [
  {
    name: "Users",
    path: "users",
    icon: HiUsers,
  },
  {
    name: "New User",
    path: "users/add",
    icon: HiUserAdd,
  },
  {
    name: "Categories",
    path: "categories",
    icon: HiListBullet,
  },
  {
    name: "New Category",
    path: "categories/add",
    icon: HiViewGridAdd,
  },
  {
    name: "Products",
    path: "products",
    icon: HiTicket,
  },
  {
    name: "New Product",
    path: "products/add",
    icon: HiChartPie,
  },
];
