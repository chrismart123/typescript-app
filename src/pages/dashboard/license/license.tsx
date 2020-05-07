import * as React from "react";
import { Component, useState } from "react";

import "./license.scss";
// import Modal from "react-bootstrap/Modal";
import ModalPop from "../../../components/modals/modal";
// import '../../../node_modules/jquery/dist/jquery';
import '../../../assets/theme_eliteadmin/dist/js/custom';
import '../../../assets/theme_eliteadmin/dist/js/pages/validation';
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import { useAuth } from "../../../context/auth";

//CALL API SERVICE
import ApiService from "../../../api/apiservice";

class License extends Component {
  // @ts-ignore: Unreachable code error
  // const [loading, setLoading] = useState();
  state = {
    isLoading: true,
    modalShow: false,
    modalShowActivate: false,
    modalShowManualRefresh: false,
    modalShowResponseOffline: false,
    licensetype: "",
    licensetitle: "",
    data: {},
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
    // this.state = { showModal: false,how: false };
    // const isAuthenticated = useAuth();
    console.log(" License isAuthenticated");
    this.apiService = new ApiService();
    // state = data: {}
    // const [modalShow, setModalShow] = React.useState(false);
  }

  showModalActivate = () => {
    this.setState({
      licensetype: "activate",
      licensetitle: "Refresh License Online"
    });
  };

  showManualRefresh = () => {
    this.setState({
      licensetype: "refreshoffline",
      licensetitle: "Refresh License Offline"
    });
  };

  showResponseOffline = () => {
    this.setState({
      licensetype: "responseoffline",
      licensetitle: "Refresh License Response"
    });
  };

  setModalShow = (data: any) => {
    this.setState({ modalShow: true });
    if (data === "activate") {
      this.showModalActivate();
    } else if (data === "refreshoffline") {
      this.showManualRefresh();
    } else if (data === "responseoffline") {
      this.showResponseOffline();
    }
  };

  setModalHide() {
    this.setState({
      modalShow: false
    });
  }

  onTest(){
    console.log("onTest BOOM");
  };

  componentDidMount() {
    this.apiService
      .getserverLicenseInfo()
      .then(res => {
        console.log("SUCCESS - getserverLicenseInfo ", res);
        let varValues = res.data.serverLicenseText;
        let varValuesArray = res.data.serverLicense;
        let varLicenseArray1 = res.data.serverLicense.licensedInputTypes;
        // console.log("varValues", varValues);
        // console.log("varValuesArray", varValuesArray);
        // console.log("varLicenseArray1", varLicenseArray1);
        this.setState({
          isLoading: false,
          data: res.data,
          serverText: [...this.state.serverText, varValues],
          serverArray: [...this.state.serverArray, varValuesArray.licenseType],
          serverArray_v2: [...this.state.serverArray, varValuesArray],
          serverLicenseone: [...this.state.serverLicenseone, varLicenseArray1]
        });
        this.varData.push(varValues);
        console.log(
          "SUCCESS - getserverLicenseInfo  this.varData",
          this.varData
        );
        this.varDataArray.push(varValuesArray);
      })
      .catch(err => {
        console.log("ERROR - getserverLicenseInfo ", err);
        this.setState({
          isLoading: false
        });
      });
  }

  handleChange = (evt: any) => {
    const value = evt.target.value;
    console.log("handleChange", value);
    // this.setState({
    //   ...this.state,
    //   [evt.target.name]: value
    // });
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("BOOM onFinishFailed");
    this.setState({ isLoading: true });
    // // this.state.isLoading = true;
    // // setLoading(true);
    // setTimeout(() => {
    //   this.setState({ isLoading: false });
    // }, 2000);

    // console.log("isLoading:", isLoading);
    console.log("Failed:", errorInfo);
  };

  

  render() {
    let data = {
      load: this.state.isLoading,
      server: this.state.data,
      serverArray: this.state.serverArray,
      serverArray_v2: this.state.serverArray_v2[0],
      serverLicenseone: []
    };

    let licenseData = {
      licenseID: this.state.licenseID,
      activatePass: this.state.activatePass,
      installName: this.state.installName
    };

    data.serverLicenseone = this.state.serverLicenseone[0];

    // console.log("RENDER DATA", data);
    // console.log("RENDER DATA serverArray_v2", data.serverArray_v2);
    // console.log("RENDER DATA serverLicenseone", data.serverLicenseone);
    let disp: any[] = [];
    if (data.serverLicenseone != undefined) {
      disp = data.serverLicenseone.map((item: any, key: any) => (
        <div key={key}>{item["featureName"]}</div>
      ));
    }
    // if (!this.state.isLoading) {
    //   console.log("data", data);
    // }
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
                  <li className="breadcrumb-item active">License</li>
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
                    <h4 className="card-title">License Information</h4>
                    <div className="row">
                      <button
                        className="btn btn-success waves-effect waves-light m-r-10"
                        onClick={data => this.setModalShow("activate")}
                      >
                        Activate / Refresh Online
                      </button>
                      <button
                        className="btn btn-success waves-effect waves-light m-r-10"
                        onClick={data => this.setModalShow("refreshoffline")}
                      >
                        Activate / Refresh Offline (Manual Request)
                      </button>
                      <button
                        className="btn btn-success waves-effect waves-light m-r-10"
                        onClick={data => this.setModalShow("responseoffline")}
                      >
                        Apply Response Offline (Manual Request)
                      </button>
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>

              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3">
                        <form className="form p-t-20">
                          <div className="form-group">
                            <label>License ID</label>
                            <div className="input-group mb-3">
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
                          <div className="form-group">
                            <label>Product ID</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon2"
                                value={data.serverArray_v2["productId"]}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Installation ID</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon3"
                                value={data.serverArray_v2["installationId"]}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Installation Name</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Confirm Password"
                                aria-label="Password"
                                aria-describedby="basic-addon4"
                                value={data.serverArray_v2["installationName"]}
                                disabled
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* end of col-lg-3 */}
                      <div className="col-lg-3">
                        <form className="form p-t-20">
                          <div className="form-group">
                            <label>Guest OS VM Allowed</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Entitled Version</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon2"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>License Creation Date</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon3"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>License Expiration Date</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Confirm Password"
                                aria-label="Password"
                                aria-describedby="basic-addon4"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* end of col-lg-3*/}
                      <div className="col-lg-3">
                        <form className="form p-t-20">
                          <div className="form-group">
                            <label>License Valid</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Node Lock Valid</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon2"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>System type</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon3"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Node Lock Valid</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Confirm Password"
                                aria-label="Password"
                                aria-describedby="basic-addon4"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* end of col-lg-3*/}
                      <div className="col-lg-3">
                        <form className="form p-t-20">
                          <div className="form-group">
                            <label>Max Transport</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Max Major Numbers</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon2"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Max Services</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon3"
                                value="--"
                                disabled
                              />
                            </div>
                          </div>
                          {/* <div className="form-group">
                            <label>Node Lock Valid</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Confirm Password"
                                aria-label="Password"
                                aria-describedby="basic-addon4"
                                value="--"
                                disabled
                              />
                            </div>
                          </div> */}
                        </form>
                      </div>
                      {/* end of col-lg-3*/}
                    </div>
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
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                Route Encoder
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label ">M-EAS</label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label ">AEA</label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label ">AEA-NRT</label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label ">ESG</label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label ">MMT</label>
                            </div>
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
                              value="--"
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
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                PSIP
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                Cable-PSIP
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                DVB-SI
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                M/H
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                SCTE-65
                              </label>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                      {/* end of col-ld-12 */}
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Enable Providers</label>
                          <div className="clearfix"></div>
                          <div className=" form-group">
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                Rovi
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                PMCP
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                Generic
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                TMS Subsciption
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                TMS Direct
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                PMCP TCP
                              </label>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                      {/* end of col-lg-12 */}
                      {/* end of col-lg-12 */}
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label>Max Providers Allowed</label>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Confirm Password"
                              aria-label="Password"
                              aria-describedby="basic-addon4"
                              value="--"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      {/* end of col-lg-3 */}
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Enable Outputs</label>
                          <div className="clearfix"></div>
                          <div className=" form-group">
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                UDP
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                Triveni Carosel
                              </label>
                            </div>
                            <div className="checkerbox custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="checkbox1"
                                id=""
                                defaultChecked
                              />
                              <label className="form-label checkbox1">
                                Harris NetX
                              </label>
                            </div>
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
                              value="--"
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

export default License;
