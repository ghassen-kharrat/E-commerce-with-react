import React, { useState } from "react";
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

// Validation helpers
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

const RegisterLogin = ({ login, register }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

    login({ email: username, password });
    
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
      })
      .catch((error) => {
        const resMessage =
          ( error?.response?.data?.message) 
          error.toString();

        setMessage(resMessage);
      });
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.Jp0PRn1PrNrWR8mI0pgDMQHaHy&pid=Api&P=0&h=180"
          alt="profile-img"
          className="profile-img-card"
          style={{width:"170px"}}
        />

        {isLogin ? (
          <Form onSubmit={handleLogin}>
            <h3>Sign In</h3>
            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
              <button className="btn btn-primary btn-block" >
                {  <span className="spinner-border spinner-border-sm"></span>}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}

            <p>
              Don't have an account?{" "}
              <a href="#!" onClick={toggleForm}>
                Sign Up
              </a>
            </p>
          </Form>
        ) : (
          <Form onSubmit={handleRegister}>
            <h3>Sign Up</h3>
            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}

            <p>
              Already have an account?{" "}
              <a href="#!" onClick={toggleForm}>
                Sign In
              </a>
            </p>
          </Form>
        )}
      </div>
    </div>
  );
};

export default RegisterLogin;
