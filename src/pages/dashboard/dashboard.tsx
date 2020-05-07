import * as React from "react";
import { Component } from "react";

import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  withRouter,
  BrowserRouter
  // useRouteMatch
} from "react-router-dom";

import "../../assets/theme_eliteadmin/dist/scss/style.scss";
import NavBar from "../../components/header/navbar";
import SideBar from "../../components/sidebar/sidebar";

// import logo1 from "../../images/triveni2.jpg";
// import logo2 from "../../images/logo-light-text.png";
import imgicon from "../../images/logo-light-icon.png";
import img1 from "../../images/logo-light-text.png";
import MainDash from "./maindash";
import Network from "./network/network";
import NetworkServer from "./network/networkserver";
import License from "./license/license";
import LicenseServer from "./license/licenseserver";
import DashOne from "./dashone";
import DashTwo from "./dashtwo";
import DashThree from "./dashthree";
import JqWidget from "./jqwidget";
import Login from "../login/login";
// let { path } = useRouteMatch();

// CALL SERVICE
import ApiService from "../../api/apiservice";

import { useAuth } from "../../context/auth";

class Dashboard extends Component {
  // static propTypes = {
  //   location: React.
  // };
  state = {
    isLoggedIn: true,
    isLoading: true,
    testObj: true,
    userCount: 0,
    user: [],
    userList: [],
    sessionID: [],
    userSession: []
  };

  sessionList: any = [];
  apiService: ApiService;

  constructor(props: any) {
    //
    super(props);
    // console.log("THEN");
    console.log("constructor Dashboard");
    // const { setAuthTokens } = useAuth();
    this.apiService = new ApiService();
    // setAuthTokens(response.);
  }

  componentDidMount() {
    console.log("DASHBOARD DID MOUNT BOOM");
    var self = this;
    self.setState({ isLoading: true });
    // @ts-ignore: Unreachable code error

    // this.apiService.getLogSessions().then(response => {
    //   console.log("axios GETSESSIONS", response);
    //   let sess = response.data.sessionId;
    //   this.setState({
    //     isLoading: false,
    //     sessionID: [...this.state.sessionID, sess],
    //     user: response.data
    //   });
    //   this.sessionList.push(sess);
    //   localStorage.setItem("sessionList", this.sessionList);
    //   sessionStorage.setItem("sessionList", this.sessionList);
    //   console.log("response", response);
    // });

    // this.apiService
    //   .getAllSessions()
    //   .then(response => {
    //     console.log("axios GETALLSESSIONS", response);
    //     this.setState({
    //       userList: response.data,
    //       userCount: response.data.length
    //     });
    //   })
    //   .catch(response => {});

    this.apiService
      .getMultipleLogSession()
      .then(response => {
        console.log("getMultipleLogSession SUCCESS", response);
        let sess = response[0].data.sessionId;
        this.setState({
          isLoading: false,
          sessionID: [...this.state.sessionID, sess],
          user: response[0].data,
          userList: response[1].data,
          userCount: response[1].data.length
        });
        this.sessionList.push(sess);
        // localStorage.setItem("sessionID", this.sessionList);
        // sessionStorage.setItem("sessionID", this.sessionList);
        // @ts-ignore: Unreachable code error
        // setAuthTokens(sess);
      })
      .catch();
  }

  componentDidUpdate = () => {
    // if (this.props.location !== prevProps.location) {
    this.onRouteChanged();
    console.log("componentDidUpdate");
    // }
  };

  onRouteChanged = () => {
    console.log("ROUTE CHANGED");
  };

  componentWillUnmount =() =>{
    localStorage.removeItem("sessionID");
    sessionStorage.removeItem("sessionID");
  }

  render() {
    // let { path } = useRouteMatch();
    // console.log("path", path);

    const Loading = {
      load: this.state.isLoading,
      states: this.state,
      user: this.state.user,
      userList: this.state.userList,
      userCount: this.state.userCount
    };
    console.log("DASHBOARD RENDER BOOM", Loading.load);

    return (
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
        <div>
          {/* <!-- ============================================================== -->
        <!-- Preloader - style you can find in spinners.css -->
        <!-- ============================================================== --> */}
          {/* <div className="preloader " >  (this.state.loginErr ? "show" : "hide") */}
          <div className={"preloader " + (Loading.load ? "show" : "hide")}>
            <div className="loader">
              <div className="loader__figure"></div>
              <p className="loader__label">Trivine Digital</p>
            </div>
          </div>
          <div id={"main-wrapper" + (!Loading.load ? "show" : "hide")}>
            <NavBar {...Loading} />
            <div className="clearfix"></div>
            <SideBar />
            <Switch>
              <Route exact path="/myApp2/dashboard">
                <MainDash {...Loading} />
              </Route>
              <Route path="/myApp2/dashboard/network">
                <Network {...Loading} />
              </Route>
              <Route path="/myApp2/dashboard/networkserver">
                <NetworkServer {...Loading} />
              </Route>
              <Route path="/myApp2/dashboard/license">
                <License {...Loading} />
              </Route>
              <Route path="/myApp2/dashboard/licenseserver">
                <LicenseServer {...Loading} />
              </Route>
              <Route path="/myApp2/dashboard/dashone">
                <DashOne {...Loading} />
              </Route>
              <Route path="/myApp2/dashboard/dashtwo">
                <DashTwo />
              </Route>
              <Route path="/myApp2/dashboard/dashthree">
                <DashThree />
              </Route>
              <Route path="/myApp2/dashboard/jqwidgets">
                <JqWidget />
              </Route>
            </Switch>
          </div>
        </div>
        </BrowserRouter>
    );
  }

  loadScript(src: any) {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.type = "text/tsx";
    document.body.appendChild(script);
  }
}

export default Dashboard;
