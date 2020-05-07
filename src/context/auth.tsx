import * as React from "react";
import { Component } from "react";
import { createContext, useContext } from "react";
const newLocal = false;
// @ts-ignore: Unreachable code error
export const AuthContext = createContext({
  isAuthenticated: false,
  authTokens: "",
  setAuthTokens: () => {}
});
// @ts-ignore: Unreachable code error
// export const authContext = React.createContext({;
//   loggedIns: false,
//   user: {},
//   updateAuth: () => {}
// });

export function useAuth() {
  return useContext(AuthContext);
}
// =====================

// const userContext = React.createContext({ user_isLoggedIn: {} }); // Create a context object

// export {
//   userContext // Export it so it can be used by other Components
// };

// =====================
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: any) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: any) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };
