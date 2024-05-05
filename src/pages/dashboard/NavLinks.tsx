import { IconType } from "react-icons";
import {
  HiChartPie,
  HiTicket,
  HiUserAdd,
  HiUsers,
  HiViewGridAdd,
} from "react-icons/hi";
import { HiListBullet } from "react-icons/hi2";
import { userRoles } from "../../utils/utils";
interface NavLinksTypes {
  name: string;
  path: string;
  icon: IconType;
  roles: string[];
}
export const NavLinks: NavLinksTypes[] = [
  {
    name: "Users",
    path: "users",
    icon: HiUsers,
    roles: [userRoles?.admin],
  },
  {
    name: "New User",
    path: "users/add",
    icon: HiUserAdd,
    roles: [userRoles?.admin],
  },
  {
    name: "Categories",
    path: "categories",
    icon: HiListBullet,
    roles: [userRoles?.admin, userRoles?.productManager],
  },
  {
    name: "New Category",
    path: "categories/add",
    icon: HiViewGridAdd,
    roles: [userRoles?.admin, userRoles?.productManager],
  },
  {
    name: "Products",
    path: "products",
    icon: HiTicket,
    roles: [userRoles?.admin, userRoles?.productManager],
  },
  {
    name: "New Product",
    path: "products/add",
    icon: HiChartPie,
    roles: [userRoles?.admin, userRoles?.productManager],
  },
];
