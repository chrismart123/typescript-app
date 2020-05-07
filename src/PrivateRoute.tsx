import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";
// @ts-ignore: Unreachable code error
function PrivateRoute({ component: Component, ...rest }) {
  //@ts-ignore: Unreachable code error
  // const { loggedIns } = useAuth();
  const isAuthenticated = useAuth();
  console.log("isAuthenticated", isAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            // to={{ pathname: "/login", state: { referer: props.location } }}
            to={{
              pathname: "/myApp2/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}


export default PrivateRoute;
