import * as React from 'react';
import { Component } from 'react';

import ModalNetwork from "../../../components/modals/modalNetwork";
import DataTable from 'react-data-table-component';
import ApiService from '../../../api/apiservice'
 
class NetworkServer extends Component{
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
    rowData:{},
    loading: false,
    totalRows: 0,
    perPage: 10,
    testValue:true,
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
      {name: 'MAC',selector: 'mac',sortable: false,},
      {name: 'IP Address',selector: 'address',sortable: false,},
      {name: 'Net Mask',selector: 'netmask',sortable: false,},
      {name: 'Gateway', selector: 'gateway',sortable: false,},
    ];
    
  }

   handleChange = (state:any) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state);
  }

  setModalShow = (data: any) => {
    console.log('setModalShow data',data);
    let ipArray = data;
    // conletst arrayData = data;
    this.setState({ 
      modalShow: true,
      rowData: ipArray,
      testValue:false
      // dataipsetting: arrayData,
     });
  }

  setModalHide() {
    this.setState({
      modalShow: false
    });
  }

  componentDidMount(){
    console.log('componentdidmount NETWORK SERVER');
    this.setState({ loading: true });
     this.apiService.local_getnetworkSettings().then( response=>{
      console.log('local getnetworkSettings success', response);
      let ipArray = response.data.ipsettings;

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
  componentDidUpdate(){
    console.log('componentdidUpdates');
    
  }

    render() { 
      const { loading, dataipsetting, totalRows } = this.state;
      this.data = dataipsetting[0];
      console.log('RENDER dataipsetting',dataipsetting)
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
                <li className="breadcrumb-item active">Network Server</li>
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
                      BOOM TEST - { JSON.stringify(this.state.testValue) }
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
 
export default NetworkServer ;