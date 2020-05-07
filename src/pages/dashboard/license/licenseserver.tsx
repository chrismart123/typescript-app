import * as React from 'react';
import { Component } from 'react';

import "./license.scss";
import ModalPop from "../../../components/modals/modalServer";
import moment from 'moment/moment.js'
import Moment from 'react-moment';

//CALL API SERVICE
import ApiService from "../../../api/apiservice";
 
class LicenseServer extends Component {
  state = {
    isLoading: true,
    modalShow: false,
    modalShowActivate: false,
    modalShowManualRefresh: false,
    modalShowResponseOffline: false,
    licensetype: "",
    licensetitle: "",
    applyOffline: false,
    data: {},
    nodeLockValid:"",
    server:[],
    serverText: [],
    serverArray: [],
    serverArray_v2: [],
    serverLicenseone: [],
    serverLicensetwo: [],
    serverLicensethree: [],
    licenseID: "",
    activatePass: "",
    installName: ""
  };
  apiService: ApiService;
  varData: any = [];
  varDataArray: any = [];


  constructor(props: any) {
    super(props);
    this.apiService = new ApiService();
  }

  showModalActivate = () => {
    this.setState({
      licensetype: "activate",
      licensetitle: "Refresh License Online"
    });
  };

  showModalRef = () => {
    this.setState({
      licensetype: "refresh",
      licensetitle: "Refresh License Online"
    });
  };

  showManualRefresh = () => {
    this.setState({
      licensetype: "refreshoffline",
      licensetitle: "Refresh License Offline"
    });
  };

  showcreateOfflineActivationRequest= () => {
    this.setState({
      licensetype: "createOfflineActivationRequest",
      licensetitle: "Create Offline Activation Request"
    });
  };

  showapplyOfflineActivationResponse = () => {
    this.setState({
      licensetype: "applyOfflineActivationResponse",
      licensetitle: "Apply Offline Activation Response",
      applyOffline: true,
    });
  };

  showcreateOfflineRefreshRequest = () => {
    this.setState({
      licensetype: "createOfflineRefreshRequest",
      licensetitle: "Create Offline Refresh Request",
    });
  };

  showapplyOfflineRefreshResponse = () => {
    this.setState({
      licensetype: "applyOfflineRefreshResponse",
      licensetitle: "Apply Offline Refresh Response",
      applyOffline: true,
    });
  };

  


  setModalShow = (data: any) => {
    this.setState({ modalShow: true });
    if (data === "activate") {
      this.showModalActivate();
    }else if(data === "refresh"){
      this.showModalRef();
    }else if (data === "createOfflineActivationRequest") { //AR
      this.showcreateOfflineActivationRequest();
    }else if (data === "applyOfflineActivationResponse") {
      this.showapplyOfflineActivationResponse();
    }else if (data === "createOfflineRefreshRequest") { //RR
      this.showcreateOfflineRefreshRequest();
    }else if (data === "applyOfflineRefreshResponse") { //RR
      this.showapplyOfflineRefreshResponse();
    }
  };

  setModalHide() {
    this.setState({
      modalShow: false
    });

  }

  componentDidMount(){
    console.log('LicenseServer componentDidMount');
    // const localURL = 'http://10.77.60.152/api/json/admin/serverLicenseInfo';
    const localURL= "http://10.77.60.152/api/json/admin/serverLicenseInfo";
   

    this.apiService.local_getserverLicenseInfo().then(
        res => {
        let nodeLockValid = res.data.nodeLockValid;
        let varValues = res.data.serverLicenseText;
        let varValuesArray = res.data.serverLicense;
        let varLicenseArray1 = res.data.serverLicense.licensedInputTypes;
        let varLicenseArray2 = res.data.serverLicense.licensedNetworkTypes;
        let varLicenseArray3 = res.data.serverLicense.licensedOutputTypes;
        console.log('local_getserverLicenseInfo SUCCESS',res);
          this.setState({
            isLoading: false,
            data: res.data,
            nodeLockValid:nodeLockValid,
            serverText: [...this.state.serverText, varValues],
            serverArray: [...this.state.serverArray, varValuesArray.licenseType],
            serverArray_v2: [...this.state.serverArray, varValuesArray],
            serverLicenseone: [...this.state.serverLicenseone, varLicenseArray1],
            serverLicensetwo: [...this.state.serverLicensetwo, varLicenseArray2],
            serverLicensethree: [...this.state.serverLicensethree, varLicenseArray3],
          });
      }).catch(
        err => {
          console.log('local_getserverLicenseInfo ERROR',err)
        }
      );


    // this.apiService
    //   .getserverLicenseInfo()
    //   .then(res => {
    //     console.log("SUCCESS - getserverLicenseInfo ", res);
    //     let varValues = res.data.serverLicenseText;
    //     let varValuesArray = res.data.serverLicense;
    //     let varLicenseArray1 = res.data.serverLicense.licensedInputTypes;
        
    //     this.setState({
    //       isLoading: false,
    //       data: res.data,
    //       serverText: [...this.state.serverText, varValues],
    //       serverArray: [...this.state.serverArray, varValuesArray.licenseType],
    //       serverArray_v2: [...this.state.serverArray, varValuesArray],
    //       serverLicenseone: [...this.state.serverLicenseone, varLicenseArray1]
    //     });
    //     this.varData.push(varValues);
    //     console.log(
    //       "SUCCESS - getserverLicenseInfo  this.varData",
    //       this.varData
    //     );
    //     this.varDataArray.push(varValuesArray);
    //   })
    //   .catch(err => {
    //     console.log("ERROR - getserverLicenseInfo ", err);
    //     this.setState({
    //       isLoading: false
    //     });
    //   });

  }
    render() { 
      let creation:any;
      let creationTimeStamp:any;
      let expiry:any;
      let expiryTimeStamp:any;
      let data = {
        load: this.state.isLoading,
        nodeLockValid:this.state.nodeLockValid,
        server: this.state.data,
        serverArray: this.state.serverArray,
        serverArray_v2: this.state.serverArray_v2[0],
        serverLicenseone: [],
        serverLicensetwo: [],
        serverLicensethree: [],
      };
      // @ts-ignore: Unreachable code error
      // console.log("DATA",data.nodeLockValid);

      let licenseData = {
        licenseID: this.state.licenseID,
        activatePass: this.state.activatePass,
        installName: this.state.installName
      };
  
      data.serverLicenseone = this.state.serverLicenseone[0];
      data.serverLicensetwo = this.state.serverLicensetwo[0];
      data.serverLicensethree = this.state.serverLicensethree[0];
      
      // console.log('data.serverLicenseone',data.serverLicenseone)
      let dispOne: any[] = [];
      let dispTwo: any[] = [];
      let dispThree: any[] = [];
      if (data.serverLicenseone != undefined) {
        dispOne = data.serverLicenseone.map((item: any, key: any) => (
          <div className="checkerbox custom-control custom-checkbox" key={key}>
            <i className="ti-check text-success"></i>
            <label className="form-label checkbox1">{item}</label>
          </div>
        ) );
      }

      if (data.serverLicensetwo != undefined) {
        dispTwo = data.serverLicensetwo.map((item: any, key: any) => (
          <div className="checkerbox custom-control custom-checkbox" key={key}>
            <i className="ti-check text-success"></i>
            <label className="form-label checkbox1">{item}</label>
          </div>
        ) );
      }

      if (data.serverLicensethree != undefined) {
        dispThree = data.serverLicensethree.map((item: any, key: any) => (
          <div className="checkerbox custom-control custom-checkbox" key={key}>
            <i className="ti-check text-success"></i>
            <label className="form-label checkbox1">{item}</label>
          </div>
        ) );
      }

      
      if (this.state.isLoading) {
        return (
          <div className="preloader">
            <div className="loader">
              <div className="loader__figure"></div>
              <p className="loader__label">Trivine Digital</p>
            </div>
          </div>
        );
      } else {
       
        return ( 
          <div className="page-wrapper">
            <ModalPop
              show={this.state.modalShow}
              onHide={() => this.setModalHide()}
              data={this.state}
            />
            <div className="container-fluid">
              <div className="row page-titles">
                <div className="col-md-12">
                
                  <h4 className="text-white">License Features </h4>
                  
                </div>
                <div className="col-md-6">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="www.google.com">Home</a>
                    </li>
                    <li className="breadcrumb-item active">License Server</li>
                  </ol>
                </div>
                <div className="col-md-6 text-right">
                  <form className="app-search d-none d-md-block d-lg-block">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search &amp; enter"
                    />
                  </form>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">License Information </h4>
                      <div className="row">
                        <button
                          className="btn btn-success waves-effect waves-light m-r-10"
                          onClick={data => this.setModalShow("activate")}
                        >
                          Activate  Online
                        </button>
                        <button
                          className="btn btn-success waves-effect waves-light m-r-10"
                          onClick={data => this.setModalShow("refresh")}
                        >
                          Refresh  Online
                        </button>
                        <br/>
                        <div className="clearfix col-md-12"></div>
                        {/* //createOfflineActivationRequest */}
                        <button
                          className="btn btn-success waves-effect waves-light m-r-10"
                          onClick={data => this.setModalShow("createOfflineActivationRequest")}
                        >
                          create Offline Activation Request
                        </button>

                        {/* //applyOfflineActivationResponse */}
                        
                        <button
                          className="btn btn-success waves-effect waves-light m-r-10"
                          onClick={data => this.setModalShow("applyOfflineActivationResponse")}
                        >
                          Apply Offline Activation Response
                        </button>
                        <br/>
                        <div className="clearfix col-md-12"></div>
                        <button
                          className="btn btn-success waves-effect waves-light m-r-10"
                          onClick={data => this.setModalShow("createOfflineRefreshRequest")}
                        >
                          create Offline Refresh Request
                        </button>
                        <button
                          className="btn btn-success waves-effect waves-light m-r-10"
                          onClick={data => this.setModalShow("applyOfflineRefreshResponse")}
                        >
                          apply Offline Refresh Response
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>

                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">License ID</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["licenseId"]}
                            disabled
                          />
                          </div>
                      </div>
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">Product ID</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["productId"]}
                            disabled
                          />
                          </div>
                      </div>
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">Installation ID</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["installationId"]}
                            disabled
                          />
                          </div>
                      </div>
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">Installation Name</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["installationName"]}
                            disabled
                          />
                          </div>
                      </div>
                      {/* /////// 4 */}
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">Guest OS VM Allowed</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["guestOSVMEnabled"]}
                            disabled
                          />
                          </div>
                      </div>
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">Entitled Version</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["version"]}
                            disabled
                          />
                          </div>
                      </div>
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">License Creation Date</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={moment(data.serverArray_v2["creationDate"]).format('DD-MM-YYYY')}
                            disabled
                          />
      
                          </div>
                      </div>
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">License Expiration Date</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={moment(data.serverArray_v2["licenseExpirationDate"]).format('DD-MM-YYYY')}
                            disabled
                          />
                          </div>
                      </div>

                      <div className="form-group row">
                          <label  className="col-2 col-form-label">License Valid</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["dashserverEnabled"]}
                            disabled
                          />
                          </div>
                      </div>
                      
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">Node Lock Type</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["nodeLockType"]}
                            disabled
                          />
                          </div>
                      </div>
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">System type</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["systemType"]}
                            disabled
                          />
                          </div>
                      </div>
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">Node Lock Valid</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.nodeLockValid}
                            disabled
                          />
                          </div>
                      </div>

                      <div className="form-group row">
                          <label  className="col-2 col-form-label">Max Transport</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["maxTransports"]}
                            disabled
                          />
                          </div>
                      </div>
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">Max Major Numbers</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["maxMajorNumbers"]}
                            disabled
                          />
                          </div>
                      </div>
                      <div className="form-group row">
                          <label  className="col-2 col-form-label">Max Services</label>
                          <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={data.serverArray_v2["maxServices"]}
                            disabled
                          />
                          </div>
                      </div>

                      {/* /////////////////////////////////// */}
                     
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Features</label>
                            <div className="clearfix"></div>
                            <div className=" form-group">
                                {dispOne}
                            </div>

                            <div className="clearfix"></div>
                          </div>
                        </div>
                        {/* end of col-lg-12 */}
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label>Max Routes</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Confirm Password"
                                aria-label="Password"
                                aria-describedby="basic-addon4"
                                value={data.serverArray_v2["maxRoutes"]}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        {/* end of col-lg-3 */}
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Network Types</label>
                            <div className="clearfix"></div>
                            <div className=" form-group">
                              {dispTwo}
                            </div>
                            <div className="clearfix"></div>
                          </div>
                          <div className="clearfix"></div>
                        </div>
                        {/* end of col-ld-12 */}
                        
                        {/* end of col-lg-3 */}
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Enable Outputs</label>
                            <div className="clearfix"></div>
                            <div className=" form-group">
                              {dispThree}
                            </div>
                            <div className="clearfix"></div>
                          </div>
                        </div>
                        {/* end of col-lg-12  */}
                        {/* end of col-lg-12 */}
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label>Max Outputs Allowed</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Confirm Password"
                                aria-label="Password"
                                aria-describedby="basic-addon4"
                                value={data.serverArray_v2["maxOutputs"]}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        {/* end of col-lg-3 */}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        );
      }
    }
}
 
export default LicenseServer;