import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = () => {
 
    navigate("/");
  };

  return (
    <div className="wrapper">
      <div className={`sidebar ${sidebarVisible ? "expand" : ""}`}>
        <div className="d-flex">
          <button className="toggle-btn" type="button" onClick={toggleSidebar}>
            <i className="fa fa-bars"></i>
          </button>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <NavLink to="/" className="sidebar-link" activeClassName="active">
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </NavLink>
          </li>

          <li className="sidebar-item">
            <NavLink
              to="/add-scenario"
              className="sidebar-link"
              activeClassName="active"
            >
              <i className="fa-solid fa-file-circle-plus"></i>
              <span>AddScenario</span>
            </NavLink>
          </li>

          <li className="sidebar-item">
            <NavLink
              to="/all-scenarios"
              className="sidebar-link"
              activeClassName="active"
            >
              <i className="fa-solid fa-th-list"></i>
              <span>Allscenarios</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              to="/add-vehicle"
              className="sidebar-link"
              activeClassName="active"
            >
              <i class="fa-solid fa-file-circle-plus"></i>
              <span>Add-vehicle</span>
            </NavLink>
          </li>
        </ul>
        <div className="sidebar-footer">
          <NavLink
            to="/"
            className="sidebar-link"
            activeClassName="active"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
