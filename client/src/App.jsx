import React, { useEffect, useState } from "react";
import RegisterLogin from "./components/RegisterLogin.jsx";
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListProducts from "./components/ListProducts.jsx";
import AddProduct from "./components/AddProduct.jsx";



const App = () => {





  const register = (body) => {
     axios
    .post("http://localhost:3000/api/admin/register", body) 
    .then((resp)=>{console.log(resp.data)})
    .catch((err)=>{console.log(err)})
    };
    // register({"name":"master","email":"w@gg.com","password":"gh23@"})
  
  const login = (body) => {
     axios
      .post("http://localhost:3000/api/admin/login", body)
      .then((response) => {console.log(response.data)
      
        if (response.data.admin) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
       
      })
      .catch((error)=>{console.log("error",error.response.data)})
      
  };
  
  const logout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    console.log("Logged out successfully");
    // Redirect or perform any additional logout actions
  }
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  // getCurrentUser()
  const AuthService = {
    register,
    login,
    getCurrentUser,
  }
  const [data,setData]=useState([])
const fetchData=()=>{
axios
.get("http://localhost:3000/api/prod/getall")
.then((resp)=>{setData(resp.data)})
.catch((error)=>{console.log(error)})
}
useEffect(()=>{fetchData()},[])
console.log(data);


const handelAddProduct=(body)=>{
  console.log("bodyyyy",body);
  
  axios
  .post("http://localhost:3000/api/prod/add",body)
  .then((resp)=>{console.log("added sucessfully", resp);
  })
  .catch((error)=>{console.log(error)})
  }
  const token = localStorage.getItem("user")
const idToken = JSON.parse(token).admin.id
  

  return( 
  <div>
   <button onClick={logout}>Logout</button>
  
  
  

  <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<RegisterLogin login={login} register={register} />} />
          <Route path="/home" element={<ListProducts data={data} />} />
          <Route path="/add" element={<AddProduct idToken={idToken} handelAddProduct={handelAddProduct} />} />
        </Routes>
      </div>
    </Router>



  
  </div>
  )
};

export default App;
