import { useGetCurrentUser } from "../../../hooks/use-get-current-user";
import { getTheRole } from "../../../utils/utils";
import { Avatar, Badge } from "flowbite-react";

const User = () => {
  const query = useGetCurrentUser();
  const currentUser = query?.data?.data;
  console.log("query", currentUser);
  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="w-60 bg-gray-50 shadow-md rounded px-6 py-4 flex flex-col items-center">
        <Avatar
          img="https://scontent.fjed2-2.fna.fbcdn.net/v/t39.30808-1/423062225_921896242705499_4366533540076828665_n.jpg?stp=dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=IGTTPC_7mcUAX-GW__4&_nc_ht=scontent.fjed2-2.fna&oh=00_AfDTRzzT7k3MuD4BI7KQSFnQ7-BeuSB6x0vS5OQITfWADA&oe=65ED99A4"
          alt="avatar of Jese"
          rounded
          size="lg"
        />

        <img src="klajsdf" alt="" />
        <h3 className="text-xl font-medium mb-1">{currentUser?.name}</h3>
        <p className="text-base text-gray-500 mb-2">{currentUser?.email}</p>
        <Badge color="red" size="sm" className="w-fit">
          {getTheRole(currentUser?.role)}
        </Badge>
      </div>
    </div>
  );
};

export default User;
