import React from "react";
import "./Logo.scss";
import { NavLink } from "react-router-dom";
import ROUTES from "../../../routes/routes";

const logo = props => (
  <div className="Logo" style={{ width: props.width }}>
    <NavLink to={ROUTES.HOME}>
      <span className="FirstPart">open</span>
      <span className="SecondPart">solar</span>
    </NavLink>
  </div>
);

export default logo;
