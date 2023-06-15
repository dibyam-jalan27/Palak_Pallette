import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Backdrop } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const UserOptions = ({ user }) => {

  const {cartItems} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <ShoppingCartIcon style={{color:cartItems.length >0 ?"tomato":"unset"}}/>, name: `Cart(${cartItems.length})`, func: cart},
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function cart() {
    navigate("/cart");
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }
  function account() {
    navigate("/account");
  }
  function orders() {
    navigate("/orders");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logged out successfully");
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:"10"}} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{zIndex:"11"}}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
