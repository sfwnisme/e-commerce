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
