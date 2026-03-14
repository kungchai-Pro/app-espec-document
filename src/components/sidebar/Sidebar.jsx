import React, { useState } from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin/" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/groupprofile" style={{ textDecoration: "none" }}>
            <li>
              <WidgetsIcon className="icon" />
              <span>Menu Profile</span>
            </li>
          </Link>
          <li>
            <Link to="/admin/typedocument" style={{ textDecoration: "none" }}>
              <FileCopyIcon className="icon" />
              <span>Type Document</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/positions" style={{ textDecoration: "none" }}>
              <AccountBoxIcon className="icon" />
              <span>Position</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/department" style={{ textDecoration: "none" }}>
              <ArticleIcon className="icon" />
              <span>Department</span>
            </Link>
          </li>
          <p className="title">SYSTEM FLOW</p>
          <li>
            <Link to="/admin/flow/" style={{ textDecoration: "none" }}>
              <AccountTreeIcon className="icon" />
              <span>Flow</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/setemail/" style={{ textDecoration: "none" }}>
              <NotificationsNoneIcon className="icon" />
              <span>Setting Email</span>
            </Link>
          </li>
          <p className="title">MENU LIST</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>

            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>

          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
          </li>
        </ul>

        <div className="menu-singoup">
          <hr />
          <ul>
            <p className="title">SIGN OUt</p>
            <li onClick={() => alert('')}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="bottom">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </div> */}
    </div>
  );
};

export default Sidebar;
