import * as React from "react";
import { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
  Switch,
  Route
} from "react-router-dom";
import "./sidebar.css";

// import $ from 'jquery';

class SideBar extends Component {

  componentDidMount(){
    console.log('componentDidMount');
    // $("#togglebtn").on("click", function() {
    //     $("body").removeClass("mini-sidebar"), 
    //     $("body").addClass("mini-sidebar");
    //   })
  }
  render() {
    console.log("sideBar - Rendered");
    return (
      <div>
        <div className="side-mini-panel">
          <ul className="mini-nav">
            <div className="togglediv">
              <a href={void(0)} id="togglebtn">
                <i className="ti-menu"></i>
              </a>
            </div>
            <li className="selected">
              <a href="#">
                <i className="icon-speedometer"></i>
              </a>
              <div className="sidebarmenu">
                <h3 className="menu-title">
                  {" "}
                  <Link to="/myApp2/dashboard">Dashboard</Link>
                </h3>
                <div className="searchable-menu">
                  <form role="search" className="menu-search">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control"
                    />
                    <a href="">
                      <i className="fa fa-search"></i>
                    </a>
                  </form>
                </div>
                <ul className="sidebar-menu">
                  <li>
                    <Link to="/myApp2/dashboard/network">Network</Link>
                    {/* <a href="/dashboard/apps"> </a> */}
                  </li>
                  <li>
                    <Link to="/myApp2/dashboard/networkserver">Network Server</Link>
                    {/* <a href="/dashboard/apps"> </a> */}
                  </li>
                  <li>
                    <Link to="/myApp2/dashboard/license">License</Link>
                    {/* <a href="/dashboard/apps"> </a> */}
                  </li>
                  <li>
                    <Link to="/myApp2/dashboard/licenseserver">License Server</Link>
                    {/* <a href="/dashboard/apps"> </a> */}
                  </li>
                  <li>
                    <Link to="/myApp2/dashboard/dashone">Dash One</Link>
                    {/* <a href="/dashboard/apps"> </a> */}
                  </li>
                  <li>
                    <Link to="/myApp2/dashboard/dashtwo">Dash Two </Link>
                    {/* <a href="index2.html"></a> */}
                  </li>
                  <li>
                    <Link to="/myApp2/dashboard/dashthree">Dash Three</Link>
                    {/* <a href="index3.html"></a> */}
                  </li>
                  <li>
                    <Link to="/myApp2/dashboard/jqwidgets">JQWidgets</Link>
                    {/* <a href="index4.html"></a> */}
                  </li>
                </ul>
              </div>
            </li>
            <li className="">
              <a href={void(0)}>
                <i className="ti-layout-grid2"></i>
              </a>
              <div className="sidebarmenu">
                <h3 className="menu-title">Apps</h3>
                <div className="searchable-menu">
                  <form role="search" className="menu-search">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control"
                    />
                    <a href="">
                      <i className="fa fa-search"></i>
                    </a>
                  </form>
                </div>
                <ul className="sidebar-menu">
                  <li>
                    <a href="app-calendar.html">Calendar</a>
                  </li>
                  <li>
                    <a href="app-chat.html">Chat app</a>
                  </li>
                  <li>
                    <a href="app-ticket.html">Support Ticket</a>
                  </li>
                  <li>
                    <a href="app-contact.html">Contact / Employee</a>
                  </li>
                  <li>
                    <a href="app-contact2.html">Contact Grid</a>
                  </li>
                  <li>
                    <a href="app-contact-detail.html">Contact Detail</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
