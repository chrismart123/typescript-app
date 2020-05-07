import * as React from "react";
import { Component, useState, useContext } from "react";
// import "../../assets/theme_eliteadmin/dist/css/pages/login-register-lock.css";
import "./login.scss";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import img1 from "../../images/background/login-register.jpg";
import logo from "../../assets/images/logo-icon.png";
import logo2 from "../../assets/images/logo-text.png";
import trivlogo from "../../assets/images/triveni2.png";
import logo1 from "../../assets/images/triveni2.jpg";
import {
  BrowserRouter as Router,
  useHistory,
  useLocation,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";

import { useAuth, fakeAuth, AuthContext } from "../../context/auth";

import ApiService from "../../api/apiservice";

// console.log("loggedIns", loggedIns);

class Login extends Component {
  // const Login = () =>{
  // const history = useHistory();
  apiService: ApiService;
  state = {
    username: "",
    password: "",
    loggedIn: false,
    loginMessage: "",
    loginErr: false,
    isLoggedIn: false,
    isError: false
  };

  isAuthenticated: boolean | undefined;

  // apiService: ApiService;

  // @ts-ignore: Unreachable code error

  // const [isLoggedIn, setLoggedIn] = useState(false);
  constructor(props: any) {
    super(props);
    // console.log("setting up server connections", this.state);
    // this.apiService = new ApiService();
    // const { isAuthenticated } = useAuth();
    this.apiService = new ApiService();
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.loginSuccessful = this.loginSuccessful.bind(this);
    // const { isAuthenticated2 } = useAuth();
    // this.isAuthenticated = new useAuth();
    // this.loginErr = false;
  }
  static contextType = AuthContext;

  componentDidMount() {
    // localStorage.clear();
    this.checkSession();
  }

  componentDidUpdate() {
    // console.log("asd");
  }

  handleChange = (evt: any) => {
    // this.setState({ [evt.target.name]: evt.target.value });
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  };

  handleLogin = () => {
    const apiConfig = {
      baseURL: "https://virtserver.swaggerhub.com/Triveni-Digital/GBWebApp/1.0.0",
      localURL: "http://localhost:8080/gbWebApp", //local
      //localURL: "http://10.77.60.152/gbWebApp" //dev
    };
    const hanglestatusLog = this.context;
    console.log("hanglestatusLog", hanglestatusLog);
    // const statLog = useAuth();
    // console.log("Stat Log", statLog);
    // const auth = authContext;
    // let data = {
    //   username:this.state.username,
    //   password:this.state.password
    // }

    // console.log('data',data);
    // this.apiService.login(data)
    // .then(
    //   res => console.log('res',res)
    //   )
    // .catch(
    //   err => console.log('err',err)
    //   );

    // const apiConfig = {

      // http://localhost:8080/gbWebApp/j_spring_security_check?username=" +
      // this.state.username +
      // "&password=" +
      // this.state.password;


    const localURL = apiConfig.localURL+"/j_spring_security_check?username=" +
      this.state.username +
      "&password=" +
      this.state.password;
    console.log("url", localURL);
    fetch(localURL, {
      method: "POST",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
      }
    })
      .then(response => {
        console.log("success", response);
        // setAuthTokens(response.);
        // statLog.isAuthenticated2 = true;
        const splitted = response.url.split("?");
        console.log("splitted", splitted[1]);
        if (splitted[1] === "authenticated") {
          this.loginSuccessful();
          // hanglestatusLog;
          // const newUser = { loggedIns: true };
          fakeAuth.isAuthenticated = true;
          this.setState({
            loggedIn: true,
            loginMessage: "success",
            isLoggedIn: true,
            isError: false
          });
        } else {
          this.setState({
            loginErr: true,
            loginMessage: "danger",
            isError: true
          });
          console.log("checking for existing session");
          // there will a code here
        }
      })
      .catch(error => {
        console.log("failed asd", error);
      });
  };

  loginSuccessful() {
    console.log("loginSuccessful", this.state.loggedIn);
  }

  checkSession = () => {
    let mySession = localStorage.getItem("sessionID");
    console.log("checkSession", mySession);
  };

  render() {
    const statusLog = this.context;
    console.log("statusLog", statusLog);
    const { loggedIn } = this.state;
    // console.log("render loggedIn", this.state);
    // const auths = fakeAuth.isAuthenticated;
    // console.log(auths);
    // console.log("referer", referer);
    if (loggedIn) {
      statusLog.isAuthenticated = true;
      // this.setState({
      //   isLoggedIn: true,
      //   LoggedIn: true
      // });
      console.log("REDIRECTING", this.state);
      return <Redirect to="/myApp2/dashboard" />;
    }
    return (
      <section
        id="wrapper"
        className="login-register login-sidebar loginPage"
        // style={{
        //   backgroundImage: img1
        // }}
      >
        <div className="login-box card">
          <div className="card-body">
            {/* <form
              className="form-horizontal form-material"
              id="loginform"
              // action="index.html"
            > */}
            <a href="www.google.com" className="text-center db">
              {/* <img src={logo} alt="Home" /> */}
              <br />
              <img src={logo1} alt="Home" className="text-center" />
            </a>
            <br />
            <br />
            <div className="clearfix"></div>
            {/* {fakeAuth.isAuthenticated} asd {auths} */}
            <div
              className={
                "alert alert-" +
                this.state.loginMessage +
                " alert-rounded " +
                (this.state.loginErr ? "show" : "hide")
              }
            >
              <i className="ti-user"></i> Authentication{" "}
              {this.state.loginErr ? "Failed" : "Success"}
              {this.state.loginErr}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                {" "}
                <span aria-hidden="true">×</span>{" "}
              </button>
            </div>
            <div className="form-group m-t-40">
              <div className="col-xs-12">
                {/* {this.loginErr} */}
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
                <input type="hidden" name="submit" value="Login" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-12">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label className="custom-control-label">Remember me</label>
                  <a
                    href="www.google.com"
                    id="to-recover"
                    className="text-dark pull-right"
                  >
                    <i className="fa fa-lock m-r-5"></i> Forgot pwd?
                  </a>
                </div>
              </div>
            </div>
            <div className="form-group text-center m-t-20">
              <div className="col-xs-12">
                <button
                  className="btn btn-info btn-lg btn-block text-uppercase btn-rounded"
                  onClick={this.handleLogin}
                >
                  Log In
                </button>
                {/* <NavLink
                    to="/dashboard"
                    className="btn btn-info btn-lg btn-block text-uppercase btn-rounded"
                  >
                    Login
                  </NavLink> */}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 m-t-10 text-center">
                <div className="social">
                  <a
                    href="www.google.com"
                    className="btn  btn-facebook"
                    data-toggle="tooltip"
                    title="Login with Facebook"
                  >
                    {" "}
                    <i aria-hidden="true" className="fa fa-facebook"></i>{" "}
                  </a>{" "}
                  <a
                    href="www.google.com"
                    className="btn btn-googleplus"
                    data-toggle="tooltip"
                    title="Login with Google"
                  >
                    {" "}
                    <i
                      aria-hidden="true"
                      className="fa fa-google-plus"
                    ></i>{" "}
                  </a>{" "}
                </div>
              </div>
            </div>
            <div className="form-group m-b-0">
              <div className="col-sm-12 text-center">
                Don't have an account?{" "}
                <a href="www.google.com" className="text-primary m-l-5">
                  <b>Sign Up</b>
                </a>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
