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

type AddUserInputsNames = "name" | "email" | "password" | "role";
export type AddUserInputs = Record<AddUserInputsNames, string>;
