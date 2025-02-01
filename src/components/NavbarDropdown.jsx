"use client";

import { Dropdown } from "flowbite-react";
import { HiLogout, HiViewGrid } from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export function NavbarDropdown() {
  const { user, logOut } = useAuth();
  return (
    <Dropdown
      style={{
        border: "none",
        width: "fit-content",
      }}
      label={
        <Avatar
          alt={user.displayName}
          src={user.photoURL}
          className="hover:scale-110 transition duration-200 ease-in-out"
        />
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{user.displayName}</span>
        <span className="block truncate text-sm font-medium">{user.email}</span>
      </Dropdown.Header>
      <Link to={"/dashboard"}>
        <Dropdown.Item
          icon={HiViewGrid}
          className="py-2 text-sm hover:bg-slate-200 transition duration-150 ease-in-out flex gap-1 "
        >
          Dashboard
        </Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={logOut}
        icon={HiLogout}
        className="py-2 text-sm hover:bg-slate-200 transition duration-150 ease-in-out flex gap-1 "
      >
        Log out
      </Dropdown.Item>
    </Dropdown>
  );
}
