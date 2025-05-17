import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../redux/auth/authActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // device_type: "w",
    // device_id: "74he8"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const actionResult = await dispatch(loginUserAction(formData));
      if (
        actionResult.payload.code === 0 &&
        actionResult.payload.error === false
      ) {
        navigate("/");
      } else {
        throw new Error(actionResult.payload || "Login failed");
      }
    } catch (err) {
      console.log("Error during login:", err);
    }
  };

  return (
    <div className="authentication-background">
      <div className="account-pages pt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="account-card-box">
                <div className="card mb-0">
                  <div className="card-body p-4">
                    <div className="text-center">
                      <div className="my-3">
                        <a href="index.html">
                          <span className="loginlogo"><img src={logo} alt /></span>
                        </a>
                      </div>
                      <h5 className="text-muted text-uppercase py-3 font-16">Sign In</h5>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-2">
                      <div className="form-group mb-3">
                        <input
                          className="form-control"
                          type="text"
                          required
                          placeholder="Enter your Email"
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          className="form-control"
                          type="password"
                          required
                          id="password"
                          placeholder="Enter your password"
                          name='password'
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>

                      {loading ?
                        <div className="form-group text-center" role="status">
                          <button className="btn btn-lg Thembtn btn-block waves-effect waves-light text-white" type="submit"> Loading... </button>
                        </div>
                        :

                        <div className="form-group text-center">
                          <button className="btn btn-lg Thembtn btn-block waves-effect waves-light text-white" type="submit"> Log In </button>
                        </div>}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
