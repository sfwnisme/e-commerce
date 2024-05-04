import useGetData from "../hooks/use-get-data";
import { CATEGORIES } from "./AXIOS";

type CategoriesTypes = {
  id: number;
  title: string;
  image: string;
  created_at: string;
  updated_at: string;
};

/**
 * -----------------------------------
 * RETURN A SINGLE CATEGRORY OBJECT
 * -----------------------------------
 * @param id - pass the id to get the category object
 * @author sfwn.me
 * @returns object - object containing the single category data
 */


