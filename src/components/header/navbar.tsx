import React from "react";
import { Component } from "react";
import {
  Link,
  Router,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import "./navbar.scss";

// import ". ../../assets/theme_eliteadmin/node_modules/perfect-scrollbar/css/style.css";
// import { Scrollbar } from "perfect-scrollbar-react";
// import "perfect-scrollbar-react/dist/style.min.css";
// import PerfectScrollbar from "perfect-scrollbar";

import logo1 from "../../assets/images/triveni2.jpg";
import logo2 from "../../assets/images/logo-light-text.png";
import img1 from "../../assets/images/users/1.jpg";
import img2 from "../../assets/images/logo-light-text.png";
import user from "../../assets/images/users/1.jpg";
import elitelogo from "../../assets/images/logo-light-icon.png";
import { render } from "@testing-library/react";
// import {  } from "react-router-dom";
//STATELESS FUNCTIONAL COMPONENT

// const NavBar = () => {
class NavBar extends Component {
  // state = {
  //   // @ts-ignore: Unreachable code error
  //   userlist: this.props.userList
  // };

  // @ts-ignore: Unreachable code error
  constructor(props, router: Router) {
    // console.log("NavBar - Rendered");
    super(props);
    console.log("NAVBAR constructor props", props);

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log("NAVBAR componentDidMount");
    // const ps = new PerfectScrollbar("#containertest", {
    //   wheelSpeed: 2,
    //   wheelPropagation: true,
    //   minScrollbarLength: 20
    // });
    // ps.update();
  }

  render() {
    //  @ts-ignore: Unreachable code error
    const { userList, userCount } = this.props;

    console.log("userCount", userCount);
    console.log("userList", userList);

    //  @ts-ignore: Unreachable code error
    // const { setAuthTokens } = useAuth();
    const logOut = () => {
      // setAuthTokens();
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    };

    return (
      <header className="topbar">
        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
          <div className="navbar-header hide">
            <a className="navbar-brand">
              <b>
                {/* <img src={elitelogo} alt="homepage" className="dark-logo" /> */}
                <img src={elitelogo} alt="homepage" className="light-logo" />
              </b>
            </a>
          </div>
          <div className="navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="d-none d-md-block d-lg-block">
                <a href="#" className="p-l-15">
                  <img src={logo1} alt="home" className="light-logo trivlogo" />
                </a>
              </li>
            </ul>
            <ul className="navbar-nav my-lg-0">
              {/* userCOUNT */}

              <li className="nav-link dropdown">
                <a
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {" "}
                  Users <span>( {userCount} )</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
                  <ul>
                    <li>
                      <div className="drop-title">users</div>
                    </li>
                    <li>
                      <div className="message-center" id="containertest">
                        {userList.map((u: any, key: any) => (
                          <a href="#" key={key}>
                            <div className="btn btn-primary btn-circle">
                              <i className="ti-user"></i>
                            </div>
                            <div className="mail-contnet">
                              <h5>{u.userName}</h5>
                              <span className="mail-desc">
                                {u.clientIpAddress}
                              </span>
                              <span className="time">{u.loggedInTime}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-link dropdown">
                <Link
                  to="/login"
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  onClick={logOut}
                >
                  <i className="fa fa-power-off"></i> Logout{" "}
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="ti-email"></i>
                  <div className="notify">
                    <span className="heartbit"></span>
                    <span className="point"></span>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
                  <ul>
                    <li>
                      <div className="drop-title">Notifications</div>
                    </li>
                    <li>
                      <div className="message-center" id="containertest">
                        <a href="#">
                          <div className="btn btn-danger btn-circle">
                            <i className="fa fa-link"></i>
                          </div>
                          <div className="mail-contnet">
                            <h5>Luanch Admin</h5>
                            <span className="mail-desc">
                              Just see the my new admin!
                            </span>
                            <span className="time">9:30 AM</span>
                          </div>
                        </a>

                        <a href="#">
                          <div className="btn btn-success btn-circle">
                            <i className="ti-calendar"></i>
                          </div>
                          <div className="mail-contnet">
                            <h5>Event today</h5>
                            <span className="mail-desc">
                              Just a reminder that you have event
                            </span>
                            <span className="time">9:10 AM</span>
                          </div>
                        </a>

                        <a href="#">
                          <div className="btn btn-info btn-circle">
                            <i className="ti-settings"></i>
                          </div>
                          <div className="mail-contnet">
                            <h5>Settings</h5>
                            <span className="mail-desc">
                              You can customize this template as you want
                            </span>
                            <span className="time">9:08 AM</span>
                          </div>
                        </a>

                        <a href="#">
                          <div className="btn btn-primary btn-circle">
                            <i className="ti-user"></i>
                          </div>
                          <div className="mail-contnet">
                            <h5>Pavan kumar</h5>
                            <span className="mail-desc">
                              Just see the my admin!
                            </span>
                            <span className="time">9:02 AM</span>
                          </div>
                        </a>
                      </div>
                    </li>
                    <li>
                      <a className="nav-link text-center link" href="#">
                        <strong>Check all notifications</strong>
                        <i className="fa fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Notif */}
              </li>
              {/* <!-- ============================================================== -->
                <!-- Messages -->
                <!-- ============================================================== --> */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  href="//#endregion"
                  id="2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="icon-note"></i>
                  <div className="notify">
                    <span className="heartbit"></span>{" "}
                    <span className="point"></span>
                  </div>
                </a>
                <div
                  className="dropdown-menu mailbox dropdown-menu-right animated bounceInDown"
                  aria-labelledby="2"
                >
                  <ul>
                    <li>
                      <div className="drop-title">You have 4 new messages</div>
                    </li>
                    <li>
                      {/* <PerfectScrollbar> */}
                      <div className="message-center">
                        {/* <!-- Message --> */}
                        <a href="#">
                          <div className="user-img">
                            <img
                              src="../assets/images/users/1.jpg"
                              alt="user"
                              className="img-circle"
                            />
                            <span className="profile-status online pull-right"></span>
                          </div>
                          <div className="mail-contnet">
                            <h5>Pavan kumar</h5>
                            <span className="mail-desc">
                              Just see the my admin!
                            </span>
                            <span className="time">9:30 AM</span>
                          </div>
                        </a>
                        {/* <!-- Message --> */}
                        <a href="#">
                          <div className="user-img">
                            <img
                              src="../assets/images/users/2.jpg"
                              alt="user"
                              className="img-circle"
                            />
                            <span className="profile-status busy pull-right"></span>
                          </div>
                          <div className="mail-contnet">
                            <h5>Sonu Nigam</h5>
                            <span className="mail-desc">
                              I've sung a song! See you at
                            </span>
                            <span className="time">9:10 AM</span>
                          </div>
                        </a>
                        {/* <!-- Message --> */}
                        <a href="#">
                          <div className="user-img">
                            <img
                              src="../assets/images/users/3.jpg"
                              alt="user"
                              className="img-circle"
                            />
                            <span className="profile-status away pull-right"></span>
                          </div>
                          <div className="mail-contnet">
                            <h5>Arijit Sinh</h5>
                            <span className="mail-desc">I am a singer!</span>
                            <span className="time">9:08 AM</span>
                          </div>
                        </a>
                        {/* <!-- Message --> */}
                        <a href="#">
                          <div className="user-img">
                            <img
                              src="../assets/images/users/4.jpg"
                              alt="user"
                              className="img-circle"
                            />
                            <span className="profile-status offline pull-right"></span>
                          </div>
                          <div className="mail-contnet">
                            <h5>Pavan kumar</h5>
                            <span className="mail-desc">
                              Just see the my admin!
                            </span>
                            <span className="time">9:02 AM</span>
                          </div>
                        </a>
                      </div>
                      {/* </PerfectScrollbar> */}
                    </li>
                    <li>
                      <a className="nav-link text-center link" href="#;">
                        <strong>See all e-Mails</strong>
                        <i className="fa fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              {/* User Profile */}
              <li className="nav-item dropdown u-pro">
                <a
                  className="nav-link dropdown-toggle waves-effect waves-dark profile-pic"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={user} alt="user" className="" />
                  <span className="hidden-md-down">
                    {" "}
                    Mark &nbsp;<i className="fa fa-angle-down"></i>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right animated flipInY">
                  <a href="#" className="dropdown-item">
                    <i className="ti-user"></i> My Profile
                  </a>
                  <a href="#" className="dropdown-item">
                    <i className="ti-wallet"></i> My Balance
                  </a>
                  <a href="#" className="dropdown-item">
                    <i className="ti-email"></i> Inbox
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">
                    <i className="ti-settings"></i> Account Setting
                  </a>
                  <div className="dropdown-divider"></div>
                  <Link to="/login" onClick={this.logout}>
                    <i className="fa fa-power-off"></i> Logout{" "}
                  </Link>
                  {/* <Redirect to="/login" />; */}
                  {/* <a href="login.html" className="dropdown-item">
                    <i className="fa fa-power-off"></i> Logout
                  </a> */}
                </div>
              </li>
              {/* <li className="nav-item right-side-toggle">
                <a className="nav-link  waves-effect waves-light" href="#">
                  <i className="ti-arrow-right ti-arrow-left"></i>
                </a>
              </li> */}
            </ul>
          </div>
        </nav>
      </header>
    );
  }

  logout() {
    // let history = useHistory();
    // let location = useLocation();
    // let from = location.state || { from: { pathname: "/" } };
    // console.log("logout history", history);
    // console.log("location", location);
    // console.log("from", from);

    // history.replace(from);
    localStorage.clear();
    window.location.href = "/";
    // <Redirect to="/login" />;
  }
}

// export default NavBar;
// classNameName NavBar extends Component {
//   render() {

//   }
// }

export default NavBar;
