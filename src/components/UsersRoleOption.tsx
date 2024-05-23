const UsersRoleOption = () => {
  return (
    <>
      <option value={""} selected disabled>
        select role
      </option>
      <option value={"1995"}>admin</option>
      <option value={"1999"}>product manager</option>
      <option value={"1996"}>writer</option>
      <option value={"2001"}>user</option>
    </>
  );
};

export default UsersRoleOption;
