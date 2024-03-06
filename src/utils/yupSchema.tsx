import * as yup from "yup";

export const loginYupSchema = yup.object({
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password should be at least 6 characters")
    .max(100, "password should be less than 100 characters"),
});

export const registerYupSchema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(3, "name should be at least 3 characters")
    .max(255, "name should be less than 255 characters"),
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password should be at least 6 characters")
    .max(100, "password should be less than 100 characters"),
});

export const AddUserYupSchema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(3, "name should be at least 3 characters")
    .max(55, "name should be less than 55 characters"),
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password should be at least 6 characters")
    .max(100, "password should be less than 100 characters"),
  role: yup.string().required("role is required"),
});

export const UpdateUserYupSchema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(3, "name should be at least 3 characters")
    .max(255, "name should be less than 255 characters"),
  email: yup.string().email().required("email is required"),
  role: yup.string().required("role is required"),
});
