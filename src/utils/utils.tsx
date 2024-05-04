type RolesType = "admin" | "writer" | "productManager" | "user";

const roles: Record<RolesType, string> = {
  admin: "1995",
  writer: "1996",
  productManager: "1999",
  user: "2001",
};
export const getTheRole = (roleNumber: string) => {
  let userRole: string;
  switch (roleNumber) {
    case roles?.admin:
      userRole = "admin";
      break;
    case roles?.writer:
      userRole = "writer";
      break;
    case roles?.productManager:
      userRole = "productManager";
      break;
    case roles?.user:
      userRole = "user";
      break;
    default:
      userRole = "not found";
  }

  return userRole;
};

export const dummyArray: (limit: number) => string[] = (limit) =>
  Array(limit).fill("");

type ShortTextType = (text: string, limit: number) => string;
/**
 * --------------------------------------------------
 * SHORT TEXT FUNCTION
 * --------------------------------------------------
 * limit the length of the text
 * @param text - the text you wanna limit its length
 * @param limit - the length you wanna limit
 * @returns string - the shorted text
 * @type {(text: string, limit: number) => string}
 * @author sfwn.me
 * --------------------------------------------------
 */
export const shortTheText: ShortTextType = (text, limit) => {
  let result = text;
  if (text.length > limit) {
    return (result = text.substring(0, limit) + "...");
  }

  return result;
};

//-------------------------------------------------------
