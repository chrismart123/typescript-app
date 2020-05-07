// /* global jQuery, $, define */
import React, { useState } from "react";

// import "./App.scss";

import "./assets/theme_eliteadmin/node_modules/bootstrap/dist/js/bootstrap.js";
import "./assets/theme_eliteadmin/dist/js/sidebarmenu.js";
import "./assets/theme_eliteadmin/dist/js/custom.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  BrowserRouter
  // useRouteMatch
} from "react-router-dom";

import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import PrivateRoute from "./PrivateRoute";
import { AuthContext, fakeAuth } from "./context/auth";

// const express = require("express");
// var cors = require('cors')
// const app = express();
// app.use(cors());
// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use('/api', createProxyMiddleware({ 
//     target: 'http://localhost:8080/', //original url
//     changeOrigin: true, 
//     //secure: false,
//     //@ts-ignore: Unreachable code error
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));
// app.listen(3000);


export default function App() {
  // @ts-ignore: Unreachable code error
  const existingTokens = JSON.parse(localStorage.getItem("sessionID"));

  const [authTokens, setAuthTokens] = useState(existingTokens);
  // const [auth, setAuth] = useState({
  //   loggedIn: false,
  //   user: {},
  //   updateAuth: (update: {
  //     loggedIn: boolean;
  //     user: {};
  //     updateAuth: (update: any) => void;
  //   }) => setAuth(auth => ({ ...auth, ...update }))
  // });

  const setTokens = (data: any) => {
    localStorage.setItem("sessionID", JSON.stringify(data));
    setAuthTokens(data);
  };

  const isAuthenticated = fakeAuth.isAuthenticated;

  return (
    <AuthContext.Provider
      // @ts-ignore: Unreachable code error
      value={{ isAuthenticated, authTokens, setAuthTokens: setTokens }}
    >
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>

        <Switch>
            <Route exact path="/myApp2" component={Login} />
            <Route exact path="/myApp2/login" component={Login} />
            <PrivateRoute path="/myApp2/dashboard" component={Dashboard} />
            <Route path="/myApp2/pagenotfound" component={Login} />
            <Redirect from="*" to="/myApp2" />
        </Switch>
      </BrowserRouter>

    </AuthContext.Provider>
  );
}
