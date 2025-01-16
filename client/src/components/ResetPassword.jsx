import React, { useState } from "react";
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useLocation } from "react-router-dom";
import "./ResetPassword.css"; // Assuming you have a CSS file for custom styles

const required = (value) => {
  if (!value) {
    return <div className="invalid-feedback d-block">This field is required!</div>;
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const ResetPassword = ({ ResettPassword }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState("");
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  // Handle reset password
  const handleResetPassword = (e) => {
    e.preventDefault();
    setMessage("");

    if (!password || password.length < 6 || password.length > 40) {
      setMessage("Please enter a valid password (6-40 characters).");
      return;
    }

    ResettPassword({ token, newPassword: password })
      .then(() => {
        setNotification("Password reset successfully!");
        setTimeout(() => setNotification(""), 3000);
      })
      .catch((error) => {
        const resMessage = (error?.response?.data?.message) || error.toString();
        setMessage(resMessage);
      });
  };

  return (
    <div className="container">
      {notification && <div className="notification">{notification}</div>}
      <div className="card card-container shadow-sm p-4">
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.Zvs5IHgOO5kip7A32UwZJgHaHa&pid=Api&P=0&h=180"
          alt="profile-img"
          className="profile-img-card mb-3"
        />

        <Form onSubmit={handleResetPassword}>
          <h3 className="text-center mb-4">Reset Password</h3>
          
          <div className="form-group mb-3">
            <label htmlFor="password">New Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              validations={[required, vpassword]}
            />
          </div>

          <div className="form-group d-grid gap-2">
            <button className="btn btn-primary btn-block">
              Reset Password
            </button>
          </div>

          {message && (
            <div className="form-group mt-3">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;