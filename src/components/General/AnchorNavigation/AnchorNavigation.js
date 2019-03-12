import React, { Component } from "react";
import "./AnchorNavigation.scss";
import { MDBNavbar, MDBNavbarNav } from "mdbreact";
import AnchorNavigationItem from "./AnchorNavigationItem/AnchorNavigationItem";

class AnchorNavigation extends Component {
  navItems = null;

  navItems = this.props.list.map(item => {
    return <AnchorNavigationItem link={item.link} key={item.link} type={item.type}>{item.name}</AnchorNavigationItem>
  });

  render() {
    return (
      <MDBNavbar className="anchor-navbar" expand="md">
        <MDBNavbarNav>
          {this.navItems}
        </MDBNavbarNav>
      </MDBNavbar>
    );
  }
}

export default AnchorNavigation;
