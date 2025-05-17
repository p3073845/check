import React from "react";
import PageHeader from "../components/commonFunc/PageHeader";

const RollAssign = () => {
  return (
    <div>
      <PageHeader />
      <div className="main_card">
        <h4 className="header-title mb-3">Roll Assign</h4>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="userSelect">Select User</label>
              <select id="userSelect" className="form-control">
                <option>Select User</option>
                <option>User One</option>
                <option>User Two</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="roleSelect">Role Name</label>
              <select id="roleSelect" className="form-control">
                <option>Select Role</option>
                <option>Admin</option>
                <option>Super Admin</option>
                <option>Account Manager</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 ">
            <div className="rollassign-checkbox">
              <ul className="rollassign-checkbox_ul">
                <li>
                  <div className="checkbox checkbox-success">
                    <input id="checkbox1" type="checkbox" />
                    <label htmlFor="checkbox1" className="mainbold_lable">
                      Panel Management
                    </label>
                  </div>
                  <ul className="rollassign-checkbox_ul_sub">
                    <li>
                      <div className="checkbox checkbox-success">
                        <input id="checkboxsub1" type="checkbox" />
                        <label htmlFor="checkboxsub1"> Panel Management </label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox checkbox-success">
                        <input id="checkboxsubsub2" type="checkbox" />
                        <label htmlFor="checkboxsubsub2"> Roll Assign </label>
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="checkbox checkbox-success">
                    <input id="checkbox2" type="checkbox" />
                    <label htmlFor="checkbox2" className="mainbold_lable">
                      Client Management
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox checkbox-success">
                    <input id="checkbox3" type="checkbox" />
                    <label htmlFor="checkbox3" className="mainbold_lable">
                      End User Management
                    </label>
                  </div>
                </li>
                <li></li>
                <li>
                  <div className="checkbox checkbox-success">
                    <input id="checkbox5" type="checkbox" />
                    <label htmlFor="checkbox5" className="mainbold_lable">
                      Logs
                    </label>
                  </div>
                  <ul className="rollassign-checkbox_ul_sub">
                    <li>
                      <div className="checkbox checkbox-success">
                        <input id="checkboxsub3" type="checkbox" />
                        <label htmlFor="checkboxsub3"> Login Logs </label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox checkbox-success">
                        <input id="checkboxsubsub4" type="checkbox" />
                        <label htmlFor="checkboxsubsub4">
                          OTP Invalid Logs
                        </label>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <button type="submit" className="btn btn-color assignbtn">
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollAssign;
