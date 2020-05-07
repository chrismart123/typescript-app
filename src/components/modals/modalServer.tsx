import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import "./modal.scss";
import Modal from "react-bootstrap/Modal";
// CALL API SERVICE
import ApiService from "../../api/apiservice";

const ModalPop = (props: any) => {

  // useEffect(() => {
  //   console.log('USE EFFECT RIRST',props.data)
  // });
  const apiservice = new ApiService();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('none');
  const [alertMsg, setAlertMsg] = useState('');

  const [forms, setforms] = useState(false);

  const[applyResponseButton, setapplyResponseButton] = useState('');
  const[applyActResponse, setapplyActResponse] = useState(false);
  const[applyActResponseHTML, setapplyActResponseHTML] = useState(null);

  const {licensetype,applyOffline } = props.data;
  console.log("licensetype",licensetype);
  console.log("applyOffline Field LAYOUT",applyOffline);

  useEffect(() => {
    console.log('USE EFFECT RIRST',props.data)
    if(props.data.modalShow== false){
      setapplyActResponse(false);
      props.data.applyOffline = false;
    }
    
  });
  // REACT HOOK
  const { register, handleSubmit, watch, errors, } = useForm();

  console.log("PROPS", props);
  console.log("PROPS props.data.licensetype", props.data.licensetype);
  console.log('alert', alert);

  const applyOfflineLayout=()=>{

  }

  const handleActivateApplyResponse = (dataHTML:any) => {
    let html = dataHTML;
    console.log('activationRequestString');
    console.log('handleActivateApplyResponse',dataHTML);
    let wnd = window.open("about:blank", "", "_blank");
    setLoading(true);
    setTimeout(function() {
      setLoading(false);
      if(wnd!=null){
        wnd.document.write(html);
      }
      props.onHide();
    }, 2000);
    
  }
  
  // console.log('applyActResponse',applyActResponse);
  const onSubmit = (values:any, e:any) => { 
    console.log('onSubmit',values);
    console.log("ON SUBMIT ++++++++++++++++++ props.data.licensetype ",props.data.licensetype);
    setLoading(true);
    if (props.data.licensetype === "activate") { //activate
      // call api for activate on save
      // ApiService.ApiService
      // @ts-ignore: Unreachable code error   
      apiservice.local_postactivateLicenseOnline(values).then(response=>{
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
        console.log("LOCAL postactivateLicenseOnline",response)
      }).catch(error=>{
        setLoading(false);
        console.log("error:", error);
        setAlert('danger');
        setAlertMsg('Error Activation on License');
        setTimeout(function() {setAlert('none')},3000);
      });  
    }else if (props.data.licensetype === "refresh") { //refresh
        console.log('REFRESH apiservice CALL')
        // call api for activate on save
        // ApiService.ApiService
        // @ts-ignore: Unreachable code error   
        apiservice.local_postactivateRefreshOnline(values).then(response=>{
            console.log("SUCCESS local_postactivateRefreshOnline", response)
          if(response.status==200){
            setTimeout(function() {
              setAlert('success');
              setAlertMsg('Success Refresh on License');
              setLoading(false);
              // form.resetFields();
              e.target.reset();
              setTimeout(function() {setAlert('none')},3000);
            }, 2000);
          }
        //   console.log("LOCAL postactivateLicenseOnline",response);
        })
        .catch((error:any)=>{
            console.log("ERROR local_postactivateRefreshOnline", error)
          setLoading(false);
          console.log("error:", error);
          setAlert('danger');
          setAlertMsg('Error Refresh on License');
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
    } else if(props.data.licensetype === "createOfflineActivationRequest") {  // createOfflineActivationRequest
      setapplyResponseButton('Apply Offline Activation Response');
      apiservice.local_createOfflineActivationRequest(values).then(response=>{
        console.log('postcreateOfflineActivationRequest SUCCESS ==========',response)
        // console.log('response,',response.data.activationRequestString);
        if(response.status==200){
          let str = response.data.activationRequestString;
          //@ts-ignore: Unreachable code error
          let enc = window.btoa(str);
          let dec = window.atob(str);

          setapplyActResponse(true);
          //@ts-ignore: Unreachable code error
          setapplyActResponseHTML(dec);
          setTimeout(function() {
            setAlert('success');
            setAlertMsg('Success '+response.data.message);
         
            setLoading(false);
            // form.resetFields();
            e.target.reset();
            setTimeout(function() {setAlert('none')},5000);
            // console.log('applyActResponse',applyActResponse);
            // console.log('applyActResponseHTML',applyActResponseHTML);
          }, 2000);
        } 
      }).catch(error=>{
        setLoading(false);
        console.log("error:", error);
        setAlert('danger');
        setAlertMsg('Error postcreateOfflineActivationRequest');
        setTimeout(function() {setAlert('none')},3000);
      }); 
    } else if(props.data.licensetype === "applyOfflineActivationResponse") {  // applyOfflineActivationResponse
      // console.log('BOOM applyOfflineActivationResponse');
      let str = applyActResponseHTML;
      //@ts-ignore: Unreachable code error
      let enc = window.btoa(str);
      let dec = window.atob(enc);
      let values = {
        "responseString": applyActResponseHTML,
        "activation": true,
        "restartOnSuccess": true
      }
      console.log('values', values)
      console.log('dec', dec)
      apiservice.local_applyOfflineActivationResponse(values).then(response=>{
        console.log('applyOfflineActivationResponse SUCCESS ==========',response)
        if(response.status==200){
          setTimeout(function() {
            setAlert('success');
            setAlertMsg('Success '+response.data.message);
            setLoading(false);
            e.target.reset();
            setTimeout(function() {setAlert('none')},5000);
          }, 2000);
        } 
      }).catch(error=>{
        setLoading(false);
        console.log("error:", error);
        setAlert('danger');
        setAlertMsg('Error applyOfflineActivationResponse');
        setTimeout(function() {setAlert('none')},3000);
      }); 
    } else if(props.data.licensetype === "createOfflineRefreshRequest") {  // createOfflineRefreshRequest
      // console.log('BOOM applyOfflineActivationResponse');
    
     
      setapplyResponseButton('Apply Offline Refresh Response');
      apiservice.local_createOfflineRefreshRequest(values).then(response=>{
        console.log('createOfflineRefreshRequest SUCCESS ==========', response)
        let str = response.data.activationRequestString;
        //@ts-ignore: Unreachable code error
        // let enc = window.btoa(str);
        let dec = window.atob(str);
       
        console.log("dec=================",dec);
        if(response.status==200){
          setTimeout(function() {
            setAlert('success');
            setapplyActResponse(true);
             //@ts-ignore: Unreachable code error
            setapplyActResponseHTML(dec);
            setAlertMsg('Success '+response.data.message);
            setLoading(false);
            e.target.reset();
            setTimeout(function() {setAlert('none')},5000);
          }, 2000);
        } 
      }).catch(error=>{
        setLoading(false);
        console.log("error:", error);
        setAlert('danger');
        setAlertMsg('Error createOfflineRefreshRequest');
        setTimeout(function() {setAlert('none')},3000);
      }); 
    } else if(props.data.licensetype === "applyOfflineRefreshResponse") {  // applyOfflineRefreshResponse
      console.log('BOOM applyOfflineActivationResponse');
      // "OfflineLicenseResponse" object, "activationRequestString"
      // let dec = window.atob(applyActResponseHTML);
      let str = applyActResponseHTML;
      //@ts-ignore: Unreachable code error
      let enc = window.btoa(str);
      let dec = window.atob(enc);
      let values = {
        "responseString": applyActResponseHTML,
        "activation": true,
        "restartOnSuccess": true
      }
      console.log('values', values)
      console.log('dec', dec)
     
      apiservice.local_applyOfflineRefreshResponse(values).then(response=>{
        console.log('applyOfflineRefreshResponse SUCCESS ==========',response)
        if(response.status==200){
          setTimeout(function() {
            setAlert('success');
            setAlertMsg('Success '+response.data.message);
            setLoading(false);
            e.target.reset();
            setTimeout(function() {setAlert('none')},5000);
          }, 2000);
        } 
      }).catch(error=>{
        setLoading(false);
        console.log("error:", error);
        setAlert('danger');
        setAlertMsg('Error local_applyOfflineRefreshResponse');
        setTimeout(function() {setAlert('none')},3000);
      }); 
    }
 }

 const showFile = async (e:any) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = (e:any) => {
      console.log()
      //@ts-ignore: Unreachable code error
      let text = (e.target.result);
      let str = text;
      //@ts-ignore: Unreachable code error
      let enc = window.btoa(str);
      let dec = window.atob(enc);
       //@ts-ignore: Unreachable code error
      setapplyActResponseHTML(enc);
      console.log("SHOW FILE DECODE", enc);
      console.log("SHOW FILE DECODE", dec);
      // alert(text)
    };
    reader.readAsText(e.target.files[0])
  }

  console.log("licenseId"+(watch("licenseId")));
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
              {/* //applyOffline LAYOUT == FALSE*/}
              {/* <div className={
                "col-md-12 " +
                (JSON.stringify(applyOffline) == "false"?"show":"hide")
                }> */}
                {!applyOffline && <div className="col-md-12">
                  <div className={"form-group "+ (errors.licenseId && +"error") }>
                    <h5>License ID<span className="text-danger">*</span></h5>
                    <input name="licenseId"  className="form-control" defaultValue={props.data.serverArray_v2[0].licenseId}  ref={register({ required: true, maxLength: 30 })} disabled={applyActResponse}/>
                    <div className="help-block">{errors.licenseId && <p>This field is required</p>}</div>
                  </div>
                  <div className={"form-group "+ (errors.password && +"error") }>
                    <h5>Activation Password<span className="text-danger">*</span></h5>
                    <input name="activationPassword"  className="form-control"  defaultValue={props.data.serverArray_v2[0].activationPassword} ref={register({ required: true, maxLength: 30 })} disabled={applyActResponse}/>
                    <div className="help-block">{errors.password && <p>This field is required</p>}</div>
                  </div>
                  <div className={"form-group "+ (errors.installationName && +"error") }>
                    <h5>Installation Name<span className="text-danger">*</span></h5>
                    <input name="installationName"  className="form-control" defaultValue={props.data.serverArray_v2[0].installationName}  ref={register({ required: true, maxLength: 30 })} disabled={applyActResponse}/>
                    <div className="help-block">{errors.installationName && <p>This field is required</p>}</div>
                  </div>
                <div className={"alert alert-"+alert}>{alertMsg}</div>
                {/* applyActResponse - {JSON.stringify(applyActResponse)} */}
                <div className={
                  "form-group showsetcreateOffline " + (JSON.stringify(applyActResponse) == "true" ? "show" : "hide")
                }>
                  <span 
                  className="btn waves-effect waves-light btn-info"
              onClick={() => handleActivateApplyResponse(applyActResponseHTML)}>{applyResponseButton}</span>
                </div>   
              </div> }
              {/* //applyOffline LAYOUT == TRUE*/}
              {applyOffline && <div className="col-md-12">
              {/* //  <div className={
              //   "col-md-12 " + (JSON.stringify(applyOffline)== "true"?"show":"hide")
              //   }> */}
                <div className={"form-group "+ (errors.responsefile && +"error") }>
                    <h5>SELECT RESPONS FILE<span className="text-danger">*</span></h5>
                    <input type="file" name="responsefile" onChange={(e) => showFile(e)} className="form-control"  ref={register({ required: true })} />
                    <div className="help-block">{errors.responsefile && <p>This field is required</p>}</div>
                  </div>
              </div>
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default waves-effect"  onClick={props.onHide} data-dismiss="alert" aria-label="Close" >Close</button>
          <button type="submit" className="btn btn btn-danger waves-effect waves-light" disabled={applyActResponse}> Activate License</button>
        </Modal.Footer>
      
        </form>
    </Modal>
  );
};

export default ModalPop;
