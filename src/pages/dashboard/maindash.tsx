import * as React from "react";
import { Component } from "react";
import { render } from "@testing-library/react";

export interface MainDashProps {
  children?: any;
}

export interface MainDashState {}

// class MainDash extends React.Component<MainDashProps, MainDashState> {
//   state = { :  }
//   render() {
//     return (  );
//   }
// }

// export default MainDash;
// export interface MainProps { onClick: Function; children?: any; otherProps?: any }
// class MainDash extends Component {
const MainDash = (props: any) => {
  // state = {
  //   childLoad: ""
  // };
  // constructor(props: any) {
  //   super(props);
  //   console.log("MainDash - Contructor", props);
  //   this.state = {
  //     childLoad: props
  //   };
  // }

  // componentDidMount() {
  //   //AJAX CALL
  //   console.log("MainDash - componentDidMount", this.props);
  //   // this.setState({});
  // }

  // render() {
  // console.log("this.states", this.state);
  console.log("this.props", props);
  console.log(props.childLoad);
  let Loading = props.states.isLoading;

  console.log("Loading ", Loading);

  const data = "RAW " + Loading;
  const session = props.states.sessionID[0];
  // console.log("isLoading ", isLoading);

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row page-titles">
          <div className="col-md-12">
            <h4 className="text-white">Main Dash </h4>
          </div>
          <div className="col-md-6">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="www.google.com">Home</a>
              </li>
              <li className="breadcrumb-item active">Blank Page</li>
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
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                This is some text within a card block. {data} - {session}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// }

export default MainDash;
