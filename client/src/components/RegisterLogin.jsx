import React, { useState } from "react";
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "./RegisterLogin.css"; // Assuming you have a CSS file for custom styles

const required = (value) => {
  if (!value) {
    return <div className="invalid-feedback d-block">This field is required!</div>;
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return <div className="invalid-feedback d-block">This is not a valid email.</div>;
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
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

const RegisterLogin = ({ forgetPassword, login, register }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState("");

  // Handle toggle between forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

    if (!username || !password) {
      setMessage("All fields are required!");
      return;
    }

    login({ email: username, password })
      .then(() => {
        setNotification("Logged in successfully!");
        setTimeout(() => setNotification(""), 3000);
      })
      .catch((error) => {
        const resMessage = (error?.response?.data?.message) || error.toString();
        setMessage(resMessage);
      });
  };

  // Handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");

    if (
      !username ||
      username.length < 3 ||
      username.length > 20 ||
      !email ||
      !isEmail(email) ||
      !password ||
      password.length < 6 ||
      password.length > 40
    ) {
      setMessage("Please fill all fields correctly.");
      return;
    }

    register({ name: username, email, password })
      .then((response) => {
        setMessage(response.data.message || "Registered successfully!");
        setNotification("Registered successfully!");
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

        {isLogin ? (
          <Form onSubmit={handleLogin}>
            <h3 className="text-center mb-4">Sign In</h3>
            <div className="form-group mb-3">
              <label htmlFor="username">Email</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group d-grid gap-2">
              <button className="btn btn-primary btn-block">
                Login
              </button>
            </div>

            {message && (
              <div className="form-group mt-3">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}

            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <a href="#!" onClick={toggleForm}>
                  Sign Up
                </a>
              </p>

              <p>
                Forget Password?{" "}
                <a href="#!" onClick={() => forgetPassword({ email: username })}>
                  Reset Password
                </a>
              </p>
            </div>
          </Form>
        ) : (
          <Form onSubmit={handleRegister}>
            <h3 className="text-center mb-4">Sign Up</h3>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                validations={[required, vusername]}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                validations={[required, validEmail]}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
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
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>

            {message && (
              <div className="form-group mt-3">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}

            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <a href="#!" onClick={toggleForm}>
                  Sign In
                </a>
              </p>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default RegisterLogin;