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
  let message: string | undefined;

  /**
   * ---------------------------------------
   * HANDLE missed error message
   * if the server status 500 and has these
   * words then the udpated data is
   * duplicated.
   * this function for the user update API
   * request, due to it has no error message
   * ---------------------------------------
   */

  const missedErrorMessage: string | "" = data?.message || "";
  let isMatch: boolean = false;

  // this regex is used to check if the error message
  const regex = /1062 Duplicate entry/gi;

  const match = missedErrorMessage.match(regex);

  if (match) {
    isMatch = true;
    console.log(isMatch);
  } else {
    isMatch = false;
    console.log(isMatch);
  }

  /**
   * ---------------------------------------
   * conditions for the error message
   * ---------------------------------------
   */
  if (isServerOff == true && isMatch === false) {
    message = "Server is offline. Please turn on the database and try again.";
  } else if (!isServerOff && data?.error) {
    message = data?.error;
  } else if (isServerOff && isMatch === true) {
    message = "The user has already been taken.";
  } else {
    message = data?.message;
  }

  return message;
};
