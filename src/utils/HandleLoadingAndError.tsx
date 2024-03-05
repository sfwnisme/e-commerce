import { ErrorResponseType } from "../types/Types";

type Types = <T>(data: T, isLoading: boolean, isError: boolean) => T | string;

// export const HandleLoadingAndError = <T,>(
//   data: T,
//   isLoading: boolean,
//   isError: boolean
// ): T | string => {
//   const value = isLoading ? "Loading..." : isError ? "Error!!" : data;
//   return value;
// };

export const LoadingAndError: Types = (data, isLoading, isError) => {
  const value = isLoading ? "Loading..." : isError ? "Error!!" : data;
  return value;
};

type ServerErrorResponseType = (error: ErrorResponseType) => string | undefined;
export const ServerErrorResponse: ServerErrorResponseType = (error) => {
  // const { status, data } = error?.response;
  const status = error?.response?.status;
  const data = error?.response?.data;
  const isServerOff: boolean = status?.toString()[0] === "5";

  // the returned message
  let message;

  if (isServerOff == true) {
    message = "Server is offline. Please turn on the database and try again.";
  } else if (!isServerOff && data?.error) {
    message = data?.error;
  } else {
    message = data?.message;
  }

  return message;
};
