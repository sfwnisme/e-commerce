type RolesType = "admin" | "writer" | "productManager" | "user";

export const userRoles: Record<RolesType, string> = {
  admin: "1995",
  writer: "1996",
  productManager: "1999",
  user: "2001",
};
export const getTheRole = (roleNumber: string) => {
  let userRole: string;
  switch (roleNumber) {
    case userRoles?.admin:
      userRole = "admin";
      break;
    case userRoles?.writer:
      userRole = "writer";
      break;
    case userRoles?.productManager:
      userRole = "productManager";
      break;
    case userRoles?.user:
      userRole = "user";
      break;
    default:
      userRole = "not found";
  }

  return userRole;
};

// get the router of the user-role page like (admin => users, productManager => products)
export const userRoutesByRole = (theRole: string) => {
  let theRoute = "/";
  if (userRoles?.admin === theRole) {
    theRoute = "/dashboard/users";
  } else if (userRoles?.writer === theRole) {
    theRoute = "/dashboard/writer";
  } else if (userRoles?.productManager === theRole) {
    theRoute = "/dashboard/products";
  } else {
    theRoute = "/";
  }
  return theRoute;
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
 * @types {(text: string, limit: number) => string}
 * @author sfwn.me
 * --------------------------------------------------
 */
export const shortTheText: ShortTextType = (text: string, limit: number) => {
  let result = text;
  if (text.length > limit) {
    return (result = text.substring(0, limit) + "...");
  }

  return result;
};

//-------------------------------------------------------
