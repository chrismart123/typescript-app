import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import "./modal.scss";
import Modal from "react-bootstrap/Modal";
// CALL API SERVICE
import ApiService from "../../api/apiservice";
import axios from "axios";

let shell = require('shelljs');
let exec = require('child_process').execFile;
const ModalNetwork = (props: any) => {
  const apiservice = new ApiService();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('none');
  const [alertMsg, setAlertMsg] = useState('');
  const [forms, setforms] = useState(false);

  // const [propval, setPropval] = useState({});

  // REACT HOOK
  const { register, handleSubmit, watch, errors, } = useForm();
  const { name, address, gateway, mac, netmask, type } = props.data.rowData;
  const  testVal = props.data.testValue;
  console.log("PROPS", props);
  console.log("testVal", testVal);
  console.log('alert', alert);
  // setPropval(props.data.dataipsetting);
 

  const test_onSubmit = (values:any, e:any) => {
    let execFile  = require('child_process').execFile;
    console.log('TEsT CLICK 2',values);
    // shell.config.execPath = shell.which('node');
    // shell.config.execPath = String(shell.which('node'))
    // shell.exec('HI');
    let dataValues = {
      "restartServer": true,
      "networkSettings": {
        "hostname": "guidebuilder",
        "ipsettings": [{
            "gateway": "10.77.48.1",
            "nameServers": [],
            "netmask": "255.255.240.0",
            "mac": "00:0c:29:3a:e3:bd",
            "address": "10.77.60.152",
            "name": "eth0",
            "type": "DHCP"
          },
          {
            "gateway": "12A",
            "nameServers": [],
            "netmask": "255.255.255.0",
            "mac": "00:0c:29:3a:e3:c7",
            "address": "10.0.10.150",
            "name": "eth1",
            "type": "STATIC"
          }
        ]
      }
    }
    
    // curl 
    // --header "Content-Type: application/json"
    // --request POST --data @/home/gbadmin/testScripts/updateNetworkSettingsRequest.json 
    // http://localhost/api/json/admin/updateNetworkSettings
    var args = "-H 'Content-Type: application/json' --request POST --data "+dataValues+" http://10.77.60.152/api/json/admin/updateNetworkSettings";
  //   execFile('curl.exe', args, {},
  //   function (error:any, stdout:any, stderr:any) {
  //     console.log('stdout: ' + stdout);
  //     console.log('stderr: ' + stderr);
  //     if (error !== null) {
  //       console.log('exec error: ' + error);
  //     }
  // });
    // exec('curl ' + args, function (error:any, stdout:any, stderr:any) {
    //   console.log('stdout: ' + stdout);
    //   console.log('stderr: ' + stderr);
    //   if (error !== null) {
    //     console.log('exec error: ' + error);
    //   }
    // });
    // let exec = require('child_process').execFile;
    // var exec = require('child_process').exec;
    // exec('curl', {
    //   cwd: '/'
    // }, function(error:any, stdout:any, stderr:any) {
    //   console.log('error',error);
    //   console.log('stdout: ' + stdout);
    //   console.log('stderr: ' + stderr);
    //   // work with result
    // });
    axios({
      url: "http://10.77.60.152/api/json/admin/updateNetworkSettings",
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data:dataValues
    })
      .then(res => {
        console.log(`Axios Call completed: ${res}`)
      }).catch(err=>{
        console.log(`Axios Call ERROR: ${err}`)
      });
  }

  const onSubmit = (values:any, e:any) => { 
    console.log('onSubmit',values);
    setLoading(true);

    apiservice.postupdateNetworkSettings(values).then(response=>{
      setLoading(true);
      console.log('postupdateNetworkSettings response',response);
      setTimeout(function() {
        e.target.reset();
        setAlert('success');
        setAlertMsg('Updated Network Setting');
        setLoading(false);
        apiservice.getnetworkSettings().then(
          resp => {console.log('resp getnetwork success',resp)}
        ).catch(
          err=>{console.log('error getnetwork',err)}
        );
        setTimeout(function() {setAlert('none')},3000);
      }, 2000);

    }).catch(error=>{
      setLoading(false);
      console.log("error:", error);
      setAlert('danger');
      setAlertMsg('Error Activation on License');
      setTimeout(function() {setAlert('none')},3000);
    })
    props.data.testValue = true;
    
 }
//  useEffect(() => {
//    console.log("USEEFFECT",propval)
//  }, []);

const changeClick = (data:any) => {
  console.log('changeClick', data)
}
  console.log(watch("licenseId"));
  return (
    <Modal
      {...props}
      // show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={handleSubmit(onSubmit)} >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Update Network Settings  - { JSON.stringify(testVal) } 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div
              className={
                "preloader " +
                (JSON.stringify(loading) == "true" ? "show" : "hide")
              }
            >
              <div className="loader">
                <div className="loader__figure"></div>
                <p className="loader__label">Loading</p>
              </div>
            </div>
            <div
              className={
                "row " + (JSON.stringify(!loading) == "true" ? "show" : "show")
              }
            >
              <div className="col-md-12">
                  
                  <div className="clearfix"></div>
                  <div className={"form-group "+ (errors.name && +"error") }>
                    <h5>Interface<span className="text-danger">*</span></h5>
                    <input name="name"  className="form-control" defaultValue={name} ref={register({ required: true, maxLength: 30 })}/>
                    <div className="help-block">{errors.name && <p>This field is required</p>}</div>
                  </div>
                  <div className={"form-group "+ (errors.type && +"error") }>
                    <h5>Type<span className="text-danger">*</span></h5>
                    <input name="type"  className="form-control"  defaultValue={type} ref={register({ required: true, maxLength: 30 })}/>
                    <div className="help-block">{errors.type && <p>This field is required</p>}</div>
                  </div>
                  <div className={"form-group "+ (errors.macAddress && +"error") }>
                    <h5>MAC<span className="text-danger">*</span></h5>
                    <input name="mac"  className="form-control" defaultValue={mac} ref={register({ required: true, maxLength: 30 })}/>
                    <div className="help-block">{errors.macAddress && <p>This field is required</p>}</div>
                  </div>
                  <div className={"form-group "+ (errors.address && +"error") }>
                    <h5>IP Address<span className="text-danger">*</span></h5>
                    <input name="address"  className="form-control"  defaultValue={address}  ref={register({ required: true, maxLength: 30 })}/>
                    <div className="help-block">{errors.address && <p>This field is required</p>}</div>
                  </div>
                  <div className={"form-group "+ (errors.netmask && +"error") }>
                    <h5>Net Mask<span className="text-danger">*</span></h5>
                    <input name="netmask"  className="form-control"  defaultValue={netmask}  ref={register({ required: true, maxLength: 30 })}/>
                    <div className="help-block">{errors.netmask && <p>This field is required</p>}</div>
                  </div>
                  <div className={"form-group "+ (errors.gateway && +"error") }>
                    <h5>Gateway<span className="text-danger">*</span></h5>
                    <input name="gateway"  className="form-control"  defaultValue={gateway}  ref={register({ required: true, maxLength: 30 })}/>
                    <div className="help-block">{errors.gateway && <p>This field is required</p>}</div>
                  </div>
                <div className={"alert alert-"+alert}>{alertMsg}</div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default waves-effect"  onClick={props.onHide} data-dismiss="alert" aria-label="Close" >Close</button>
          {/* <button className="btn btn-default waves-effect" onClick={changeClick(testVal)}>change on Click</button> */}
          <button type="submit" className="btn btn btn-danger waves-effect waves-light">Update</button>
        </Modal.Footer>
      
        </form>
    </Modal>
  );
};

export default ModalNetwork;
