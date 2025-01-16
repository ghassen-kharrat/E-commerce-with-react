import React, { useEffect, useState } from "react";
import RegisterLogin from "./components/RegisterLogin.jsx";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ListProducts from "./components/ListProducts.jsx";
import AddProduct from "./components/AddProduct.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import Navbar from "./components/Navbar.jsx";
import Search from "./components/Search.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

const App = () => {
  const [currentProd, setCurrentProd] = useState(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
console.log("currentProd",currentProd);


  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/prod/getall")
      .then((resp) => setData(resp.data))
      .catch((error) => console.log(error));
  };

  const register = (body) => {
    axios
      .post("http://localhost:3000/api/admin/register", body)
      .then((resp) => {console.log("Registered Successfully:", resp.data)
        window.location.href = "/home"; 
      })
      .catch((err) => console.log(err));
  };

  const login = (body) => {
    axios
      .post("http://localhost:3000/api/admin/login", body)
      .then((response) => {
        console.log("Login Successful:", response.data);
        if (response.data.admin) {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.href = "/home"; 
        }
      })
      .catch((error) => console.log("Login Error:", error.response.data.message));
  };
  const forgetPassword = (body) => {
    axios
      .post("http://localhost:3000/api/admin/forget", body)
      .then((resp) =>{ console.log("E-mail sent successfully to your :", body)
        
      })
      .catch((err) => console.log(err));
  };
  const ResettPassword = (body) => {
    axios
      .post("http://localhost:3000/api/admin/reset", body)
      .then((resp) =>{ console.log("Your mail is uptodate :", resp)
        window.location.href = "/signup"; 
      })
      .catch((err) => console.log(err));
  };





  const logout = () => {
    localStorage.removeItem("user");
    console.log("Logged out successfully");
    window.location.href = "/signup";
  };

  const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));

  const isAuthenticated = () => !!localStorage.getItem("user");

  const handelAddProduct = (body) => {
    console.log("Adding Product:", body);
    axios
      .post("http://localhost:3000/api/prod/add", body)
      .then((resp) => {
        console.log("Product Added Successfully:", resp.data);
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  const handelDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/api/prod/delete/${id}`)
      .then(() => {
        console.log("Product Deleted Successfully");
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  const handelUpdateProduct = (id, body) => {
    console.log("Updating Product:", body);
    axios
      .put(`http://localhost:3000/api/prod/update/${id}`, body)
      .then(() => {
        console.log("Product Updated Successfully");
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isAuthenticated()) {
      fetchData();
    }
  }, []);

  const token = localStorage.getItem("user");
  const idToken = token ? JSON.parse(token).admin.id : null;

  const getCurrentProdAndChangeView = (prod) => {
    setCurrentProd(prod);
  };

  return (
    <Router>
      <div>
        {isAuthenticated() && <Navbar data= {data} setSearchTerm={setSearchTerm} logout={logout} />}
        <Routes>
         
          <Route
            path="/"
            element={
              isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/signup" />
            }
          />

       
          <Route path="/signup" element={<RegisterLogin forgetPassword={forgetPassword} login={login} register={register} />} />
          <Route path="/reset-password" element={<ResetPassword  ResettPassword={ResettPassword} />} />
         
          {isAuthenticated() ? (
            <>
              <Route
                path="/home"
                element={
                  <ListProducts
                  getCurrentProdAndChangeView={getCurrentProdAndChangeView}
                    handelDeleteProduct={handelDeleteProduct}
                   data= {data.filter((prod) =>
                      prod.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )}
                  />
                }
              />

              <Route
                path="/add"
                element={
                  <AddProduct data={data} idToken={idToken} handelAddProduct={handelAddProduct} />
                }
              />
              <Route
                path="/update"
                element={
                  <UpdateProduct
                    currentProd={currentProd}
                    idToken={idToken}
                    handelUpdateProduct={handelUpdateProduct}
                  />
                }
              />
              <Route
  path="/home"
  element={<Search products={data} ktibaserach={searchTerm} />}
/>
            </>
          ) : (
            <Route path="*" element={<Navigate to="/signup" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
