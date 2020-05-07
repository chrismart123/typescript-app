
import React from 'react';
import axios from "axios";
// const { createContext, useContext } = React;
// // Set config defaults when creating the instance

// const ApiServiceContext = createContext(null);
// export const useApiService = () => {
//   return useContext(ApiServiceContext);
// };

// export const AuthProvider = (props) => {
//   const value = {
//     signIn: props.signIn || signIn,
//     signUp: props.signUp || signUp,
//   };

//   return (
//     <AuthProvider.Provider value={value}>
//       {props.children}
//     </AuthProvider.Provider>
//   );
// };

// const postactivateLicenseOnline = (data:any) => {
//   return axios.post(apiConfig.baseURL + "/activateLicenseOnline")
// };


const apiConfig = {
  baseURL: "https://virtserver.swaggerhub.com/Triveni-Digital/GBWebApp/1.0.0",
  //localURL: "http://localhost:8080/gbWebApp", //local
  localURL: "http://10.77.60.152", //dev
  //localserverAPIURL: "http://localhost:8080/api/json/admin", //local
  localserverAPIURL: "http://10.77.60.152/api/json/admin", //dev
};

class ApiService {
  constructor() {
    console.log("API_SERVICE");
  }

  // CALL LOGIN
  login = (data: any) => {
    return axios.post(
      apiConfig.localURL +"/j_spring_security_check?username=" +data.username + "&password=" + data.password
    );
  }

  // CALLS LogSessions
  getLogSessions() {
    return axios.get(apiConfig.baseURL + "/loginSession");
  }

  // CALLS LogAllSessions
  getAllSessions() {
    return axios.get(apiConfig.baseURL + "/allLoginSessions");
  }

  // GETTING MULTIPLE AXIOS AT ONE CALL
  getMultipleLogSession() {
    const requestOne = axios.get(apiConfig.baseURL + "/loginSession");
    const requestTwo = axios.get(apiConfig.baseURL + "/allLoginSessions");
    return axios.all([requestOne, requestTwo]);
  }

  //CALLS LICENSE API
  getserverLicenseInfo() {
    return axios.get(apiConfig.baseURL + "/serverLicenseInfo");
  }

  postactivateLicenseOnline = (data:any) => {
    return axios.post(apiConfig.baseURL + "/activateLicenseOnline")
  };

  postactivateRefreshOffline = (data:any) => {
    return axios.post(apiConfig.baseURL + "/refreshLicenseOnline")
  };

  postcreateOfflineActivationRequest = (data:any) => {
    return axios.post(apiConfig.baseURL + "/createOfflineActivationRequest")
  };

  postapplyOfflineActivationResponse = (data:any) => {
    return axios.post(apiConfig.baseURL + "/applyOfflineActivationResponse")
  };

  postcreateOfflineRefreshRequest = (data:any) => {
    return axios.post(apiConfig.baseURL + "/createOfflineRefreshRequest")
  };

  postapplyOfflineRefreshResponse = (data:any) => {
    return axios.post(apiConfig.baseURL + "/applyOfflineRefreshResponse")
  };
  getnetworkSettings =()=>{
    return axios.get(apiConfig.baseURL + "/networkSettings")
  }

  postupdateNetworkSettings = (data:any) => {
    return axios.post(apiConfig.baseURL + "/updateNetworkSettings")
  }

  // LOCAL GB SERVER

  local_getserverLicenseInfo(){
    return axios.get(apiConfig.localserverAPIURL + "/serverLicenseInfo");
  }

 

  local_postactivateLicenseOnline = (data:any) => {
    return axios.post(apiConfig.localserverAPIURL + "/activateLicenseOnline", data);
  }

  local_postactivateRefreshOnline = (data:any) => {
    console.log('local_postactivateRefreshOnline',data)
    return axios.post(apiConfig.localserverAPIURL + "/refreshLicenseOnline", data);
  }

  local_createOfflineActivationRequest = (data:any) => {
    return axios.post(apiConfig.localserverAPIURL + "/createOfflineActivationRequest", data);
  }

  local_applyOfflineActivationResponse = (data:any) => {
    return axios.post(apiConfig.localserverAPIURL + "/applyOfflineActivationResponse", data);
  }

  local_createOfflineRefreshRequest = (data:any) => {
    return axios.post(apiConfig.localserverAPIURL + "/createOfflineRefreshRequest", data);
  }

  local_applyOfflineRefreshResponse = (data:any) => {
    return axios.post(apiConfig.localserverAPIURL + "/applyOfflineRefreshResponse", data);
  }

  local_getnetworkSettings(){
    return axios.get(apiConfig.localserverAPIURL + "/networkSettings");
  }

  local_postupdateNetworkSettings = (data:any) => {
    // http://localhost/api/json/admin/updateNetworkSettings
    return axios.post(apiConfig.localserverAPIURL + "/updateNetworkSettings")
    // return axios.post(apiConfig.localserverAPIURL + "/updateNetworkSettingsRequest")
  }



}

export default ApiService;
