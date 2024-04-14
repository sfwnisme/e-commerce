// cate(error) => error: ErrorResponeType
export type ErrorResponseType = {
  response: {
    status: number;
    data: {
      error?: string;
      errors?: {
        email?: string;
        password?: string;
      };
      message?: string;
    };
  };
};

/**
 * -----------------------------
 * React Hook Form Library Inputs Types
 * -----------------------------
 */

// login
type LoginInputsNames = "email" | "password";
export type LoginInputs = Record<LoginInputsNames, string>;

// register
type RegisterInputsNames = "name" | "email" | "password";
export type RegsiterInputs = Record<RegisterInputsNames, string>;

/**
 * -----------------------------
 * Users types
 * -----------------------------
 */

export type UserDataType = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

type AddUserInputsNames = "name" | "email" | "password" | "role";
type UpdateUserInputsNames = "name" | "email" | "role";
export type AddUserInputs = Record<AddUserInputsNames, string>;
export type UdpateUserInput = Record<UpdateUserInputsNames, string>;

/**
 * -----------------------------
 * categories types
 * -----------------------------
 */

export type CategoriesDataType = {
  id: number;
  title: string;
  image: string;
};

type AddCategoryInputsNames = "title" | "image";
export type AddCategoryInputs = {
  title: string;
  image?: File;
};

/**
 * -----------------------------
 * Products types
 * -----------------------------
 */
export interface AddProductInputs {
  id?: number ;
  category: number | null;
  title: string;
  description: string;
  rating?: string;
  ratings_number?: number;
  price?: number;
  discount?: number;
  About?: string;
  status?: string | boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}

// category: 'Select Category',
// title: '',
// description: '',
// price: '',
// discount: '',
// About: '',

/**
 * -----------------------------
 * API requests types
 * -----------------------------
 * you can use it for deleting requests
 */

export type DataType = {
  id?: number | number;
  name?: string;
  email?: string;
  role?: string;
};
export type ApiIdRequest = (id: string) => Promise<void>;
export type handleRemoveUserType = (data: DataType) => Promise<void>;

export interface UpdateUserTypes<T> {
  [key: string]: T;
}
