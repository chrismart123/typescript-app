import * as React from "react";
import { Component } from "react";

class DashTwo extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row page-titles">
            <div className="col-md-12">
              <h4 className="text-white">DashTwo</h4>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="www.google.com">Home</a>
                </li>
                <li className="breadcrumb-item active">DashTwo</li>
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
        </div>
      </div>
    );
  }
}

export default DashTwo;
