import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import "./modal.scss";
import Modal from "react-bootstrap/Modal";
// CALL API SERVICE
import ApiService from "../../api/apiservice";

const ModalPop = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('none');
  const [alertMsg, setAlertMsg] = useState('');
  const apiservice = new ApiService();
  const [forms, setforms] = useState(false);

  // REACT HOOK
  const { register, handleSubmit, watch, errors, } = useForm();

  const {licensetype,applyOffline } = props.data;

  console.log("PROPS", props);
  console.log("PROPS props.data.licensetype", props.data.licensetype);
  console.log("licensetype",licensetype);
  console.log("applyOffline",applyOffline);
 
  console.log('alert', alert);

  const onSubmit = (values:any, e:any) => { 
    console.log('onSubmit',values);
    setLoading(true);
    if (props.data.licensetype === "activate") { //licensetype
      // call api for activate on save
      // ApiService.ApiService
      // @ts-ignore: Unreachable code error   
      apiservice.postactivateLicenseOnline(values).then(response=>{
        if(response.status==200){
          setTimeout(function() {
            setAlert('success');
            setAlertMsg('Success Activation on License');
            setLoading(false);
            // form.resetFields();
            e.target.reset();
            setTimeout(function() {setAlert('none')},3000);
          }, 2000);
        }
        console.log("postactivateLicenseOnline",response)
      }).catch(error=>{
        setLoading(false);
        console.log("error:", error);
        setAlert('danger');
        setAlertMsg('Error Activation on License');
        setTimeout(function() {setAlert('none')},3000);
      });  
    } else if(props.data.licensetype === "refreshoffline"){ //refreshoffline
      console.log('BOOM postofflineActivationRequest');
      apiservice.postcreateOfflineActivationRequest(values).then(response=>{
        console.log('postofflineActivationRequest',response)
        if(response.status==200){
          setTimeout(function() {
            setAlert('success');
            setAlertMsg('Success Offline Activation on License');
            setLoading(false);
            // form.resetFields();
            e.target.reset();
            setTimeout(function() {setAlert('none')},3000);
          }, 2000);
        } 
      }).catch(error=>{
        setLoading(false);
        console.log("error:", error);
        setAlert('danger');
        setAlertMsg('Error Activation on License');
        setTimeout(function() {setAlert('none')},3000);
      }); 
    } else if(props.data.licensetype === "responseoffline") {  // responseoffline
      // console.log('BOOM applyOfflineActivationResponse');
      apiservice.postapplyOfflineActivationResponse(values).then(response=>{
        console.log('postapplyOfflineActivationResponse',response)
        if(response.status==200){
          setTimeout(function() {
            setAlert('success');
            setAlertMsg('Success Offline Activation on License');
            setLoading(false);
            // form.resetFields();
            e.target.reset();
            setTimeout(function() {setAlert('none')},3000);
          }, 2000);
        } 
      }).catch(error=>{
        setLoading(false);
        console.log("error:", error);
        setAlert('danger');
        setAlertMsg('Error Activation on License');
        setTimeout(function() {setAlert('none')},3000);
      }); 
    }
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
            {props.data.licensetitle} - {JSON.stringify(loading)}
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
                  <div className={"form-group "+ (errors.licenseId && +"error") }>
                    <h5>License ID<span className="text-danger">*</span></h5>
                    <input name="licenseId"  className="form-control" defaultValue={props.data.serverArray_v2[0].licenseId}  ref={register({ required: true, maxLength: 10 })}/>
                    <div className="help-block">{errors.licenseId && <p>This field is required</p>}</div>
                  </div>
                  <div className={"form-group "+ (errors.password && +"error") }>
                    <h5>Activation Password<span className="text-danger">*</span></h5>
                    <input name="password"  className="form-control"  defaultValue={props.data.serverArray_v2[0].activationPassword} ref={register({ required: true, maxLength: 10 })}/>
                    <div className="help-block">{errors.password && <p>This field is required</p>}</div>
                  </div>
                  <div className={"form-group "+ (errors.installationName && +"error") }>
                    <h5>Installation Name<span className="text-danger">*</span></h5>
                    <input name="installationName"  className="form-control" defaultValue={props.data.serverArray_v2[0].installationName}  ref={register({ required: true, maxLength: 10 })}/>
                    <div className="help-block">{errors.installationName && <p>This field is required</p>}</div>
                  </div>
                <div className={"alert alert-"+alert}>{alertMsg}</div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default waves-effect"  onClick={props.onHide} data-dismiss="alert" aria-label="Close" >Close</button>
          <button type="submit" className="btn btn btn-danger waves-effect waves-light"> Activate License</button>
        </Modal.Footer>
      
        </form>
    </Modal>
  );
};

export default ModalPop;
