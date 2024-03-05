"use client";
import { Button, Sidebar } from "flowbite-react";
import { HiArrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { NavLinks } from "./NavLinks";
import React from "react";

const DashboardSideBar = ({ toggle }: { toggle: boolean }) => {
  const NavList: React.ReactNode[] | null = NavLinks?.map((link) => (
    <NavLink to={link?.path} key={link?.name} end={true}>
      {({ isActive }) => (
        <Sidebar.Item
          icon={link?.icon}
          className={`${isActive ? "text-red-500" : ""}`}
        >
          {link?.name}
        </Sidebar.Item>
      )}
    </NavLink>
  ));

  return (
    <Sidebar
      aria-label="Sidebar with logo branding example"
      className={`
      border-r border-b ${toggle ? "block" : "hidden"} sm:block basis-28
      h-[calc(100vh-61.6px)]
      `}
    >
      <Sidebar.Logo
        href="#"
        img="https://res.cloudinary.com/daa68wahe/image/upload/v1695638124/sfwn_logo_orange_transparent_mn2vj2.png"
        imgAlt="Flowbite logo"
        className="border  border-gray-400 w-fit p-1 rounded"
      >
        <NavLink to="/">
          <Button
            color="blue"
            size={"xs"}
            className="flex items-center justify-center"
          >
            store
            <HiArrowRight className="ml-2" />
          </Button>
        </NavLink>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>{NavList}</Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSideBar;
