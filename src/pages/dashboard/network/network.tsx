import * as React from "react";
import { Component } from "react";
import ModalNetwork from "../../../components/modals/modalNetwork";
import DataTable from 'react-data-table-component';

import ApiService from '../../../api/apiservice';

import Modal from "react-bootstrap/Modal";

const CustomLoader = () => (
  <div className="preloader">
    <div className="loader">
      <div className="loader__figure"></div>
      <p className="loader__label">Trivine Digital</p>
    </div>
  </div>
);



class Network extends Component {
  data: { 
    name: string; 
    type: string;
    macAddress: string;
    address: string;
    netmask: string;
    gateway: string;
   }[];

  state = {
    modalShow: false,
    hostname:'',
    dataipsetting: [],
    loading: false,
    totalRows: 0,
    perPage: 10,
  }

  // data:[];
  columns: (
  { name: string; selector: string; sortable: boolean;  } |
  { name: string; selector: string; sortable: boolean; } |
  { name: string; selector: string; sortable: boolean; } |
  { name: string; selector: string; sortable: boolean; } |
  { name: string; selector: string; sortable: boolean; } |
  { name: string; selector: string; sortable: boolean; } 
  )[];
  apiService: ApiService;
  constructor(props: any) {
    super(props);
    this.apiService = new ApiService();
    this.data = [];
    this. columns = [
      {name: 'Interface',selector: 'name',sortable: true,},
      {name: 'Type', selector: 'type', sortable: false,},
      {name: 'MAC',selector: 'macAddress',sortable: false,},
      {name: 'IP Address',selector: 'address',sortable: false,},
      {name: 'Net Mask',selector: 'netmask',sortable: false,},
      {name: 'Gateway', selector: 'gateway',sortable: false,},
    ];
    
  }

  setModalShow = (data: any) => {
    this.setState({ 
      modalShow: true
     });
  }

  setModalHide() {
    this.setState({
      modalShow: false
    });
  }

  componentDidMount(){
    console.log('componentdidmount NETWORK');
    this.setState({ loading: true });
     this.apiService.getnetworkSettings().then( response=>{
      console.log('getnetworkSettings success', response);
      let ipArray = response.data.ipSettings;

       this.setState({
        hostname: response.data.hostname,
        dataipsetting: [...this.state.dataipsetting,ipArray],
      });
      setTimeout(() =>{
        this.setState({loading:false})
      },2000)
     

      // this.data = [
      //   // { id: 1, title: 'Conan the Barbarian', year: '1982' } 
      // ];
    }).catch(error=>{
      console.log('getnetworkSettings error', error);
    });
    console.log('componentDidMount', this.state)
  }

  doubleClicked = () => {
      console.log('doubleClicked,');
  }


  



  render() {
    console.log('render', this.state)
    // const ipsetting = this.state.dataipsetting;
    const { loading, dataipsetting, totalRows } = this.state;
    console.log('dataipsetting',dataipsetting)
    // console.log('loading',this.state.dataipsetting);
    // console.log('loading',loading);
    // console.log('dataipsetting',dataipsetting);
    // console.log('totalRows',totalRows);
    // // this.data = ipsetting;
    // let dataArry = [];
    // if(dataipsetting!=undefined){
    //   this.data = ipsetting
    //   console.log(' this.data arara', this.data)
    // }
    // console.log("render ipsetting",this.state);
    this.data = dataipsetting[0];
    return (
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row page-titles">
            <div className="col-md-12">
              <h4 className="text-white">Network</h4>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="www.google.com">Home</a>
                </li>
                <li className="breadcrumb-item active">Network</li>
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
          {/* end of row titlte */}


          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="form-group m-t-40 row">
                      <label className="col-2 col-form-label">Host Name</label>
                      <div className="col-10">
                          <input className="form-control" type="text" defaultValue={this.state.hostname} id="example-text-input" />
                      </div>
                  </div>
                  
                  {/* REACT DATATABLE */}
                  <div className="reactDatatable">
                    <DataTable
                      title="Network Settings"
                      columns={this.columns}
                      data={this.data}
                      highlightOnHover
                      progressPending={loading}
                      selectableRows
                      onRowDoubleClicked={this.setModalShow}
                      // progressComponent={<CustomLoader />}
                      pagination
                    />
                    <ModalNetwork
                      show={this.state.modalShow}
                      onHide={() => this.setModalHide()}
                      data={this.state}
                      
                    />
                    <div className="clearfix"></div>  
                   </div>
                  {/* <div className="card">
                            <div className="card-body">
                                This is some text within a card block.
                            </div>
                        </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Network;
