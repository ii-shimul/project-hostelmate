import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { MenuOpenRounded, Notifications } from "@mui/icons-material";
import DropdownNav from "./DropdownNav";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { IconButton } from "@mui/material";

const NavBar = () => {
  const { user } = useAuth();
  return (
    <nav
      id="start"
      className="py-3 flex justify-between items-center max-sm:px-4 max-xl:px-5 z-[100] max-w-7xl mx-auto"
    >
      <Link
        to={"/"}
        className="text-primary flex gap-3 items-center justify-center"
      >
        <span className="bg-secondary p-2 rounded-sm">
          <svg
            id="brandHeader"
            width="22"
            height="23"
            viewBox="0 0 22 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.03198 3.80281V7.07652L3.86083 9.75137L0.689673 12.4263L0.667474 6.56503C0.655304 3.34138 0.663875 0.654206 0.686587 0.593579C0.71907 0.506918 1.4043 0.488223 3.87994 0.506219L7.03198 0.529106V3.80281ZM21.645 4.36419V5.88433L17.0383 9.76316C14.5046 11.8966 11.2263 14.6552 9.75318 15.8934L7.07484 18.145V20.3225V22.5H3.85988H0.64502L0.667303 18.768L0.689673 15.036L2.56785 13.4609C3.60088 12.5946 6.85989 9.85244 9.81009 7.36726L15.1741 2.84867L18.4096 2.8464L21.645 2.84413V4.36419ZM21.645 15.5549V22.5H18.431H15.217V18.2638V14.0274L15.4805 13.7882C15.8061 13.4924 21.5939 8.61606 21.6236 8.61248C21.6353 8.61099 21.645 11.7351 21.645 15.5549Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
        <span className="text-xl md:text-3xl font-semibold">HostelMate</span>
      </Link>
      <div className="max-md:hidden">
        <ul className="ul-parent">
          <li className="center text-lg">
            <NavLink to={"/"} viewTransition className="link px-3 py-1">
              Home
            </NavLink>
          </li>
          <li className="center text-lg">
            <NavLink to={"/meals"} viewTransition className="link px-3 py-1">
              Meals
            </NavLink>
          </li>
          <li className="center text-lg">
            <NavLink to={"/upcoming-meals"} className="link px-3 py-1">
              Upcoming Meals
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex gap-1 items-center">
        <Notifications className="text-primary" />
        {user?.email ? (
          <DropdownNav />
        ) : (
          <Link to={"/login"}>
            <Button text={"Join Us"}></Button>
          </Link>
        )}
        <div className="px-0 md:hidden">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <IconButton color="primary" {...bindTrigger(popupState)}>
                  <MenuOpenRounded />
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <NavLink to={"/"} viewTransition>
                    <MenuItem onClick={popupState.close}>Home</MenuItem>
                  </NavLink>
                  <NavLink to={"/meals"} viewTransition>
                    <MenuItem onClick={popupState.close}>Meals</MenuItem>
                  </NavLink>
                  <NavLink to={"/upcoming-meals"} viewTransition>
                    <MenuItem onClick={popupState.close}>
                      Upcoming Meals
                    </MenuItem>
                  </NavLink>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
