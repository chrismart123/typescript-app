import * as React from "react";
import { Component } from "react";
import "../../../src/assets/theme_eliteadmin/dist/css/jqx.base.css";

import JqxButton, {
  IButtonProps
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons";

class JqWidget extends Component {
  private textImageButton = React.createRef<JqxButton>();
  private htmlButton = React.createRef<JqxButton>();
  private events = React.createRef<HTMLDivElement>();
  constructor(props: {}) {
    super(props);
    this.buttonClicked = this.buttonClicked.bind(this);
    // this.submitButtonClicked = this.submitButtonClicked.bind(this);
    // this.imageButtonClicked = this.imageButtonClicked.bind(this);
    // this.textImageButtonClicked = this.textImageButtonClicked.bind(this);
    // this.hTMLButtonClicked = this.hTMLButtonClicked.bind(this);
    this.state = {
      imgPosition: "center",
      textImageRelation: "imageBeforeText",
      textPosition: "left",
      value: "<span style={{ fontWeight: 'bold' }}>HTML Button</span>"
    };
  }
  render() {
    return (
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row page-titles">
            <div className="col-md-12">
              <h4 className="text-white">JqWidget</h4>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">JqWidget</li>
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
                  {/* JQBUTTONS */}
                  <div style={{ marginTop: "20px" }}>
                    <JqxButton
                      width={120}
                      height={30}
                      onClick={this.buttonClicked}
                    >
                      Button
                    </JqxButton>
                    <div style={{ marginTop: "1em" }}>Events:</div>
                    <div ref={this.events} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  private buttonClicked() {
    this.events.current!.innerHTML = "<span>Button Clicked</span>";
  }
}

export default JqWidget;
