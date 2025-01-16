import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; 
import './Navbar.css'; 

function Navbar({ data, logout, setSearchTerm }) {
  console.log(data,"wa333");
  
  const isAuthenticated = !!localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MyLogo
        </Link>
        <input
          type="text"
          className="navbar-search"
          placeholder="Search products..."
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <ul className="navbar-menu">
          {isAuthenticated ? (
            <>
<div>
     

  <div className="dropdown">
  <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown link
  </a>

  {data.map((element,i)=>{
  return(
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a className="dropdown-item" href="#">{data[0].Category.name}</a></li>
    <li><a className="dropdown-item" href="#">{data[1].Category.name}</a></li>
    <li><a className="dropdown-item" href="#">{data[2].Category.name}</a></li>
    <li><a className="dropdown-item" href="#">{data[3].Category.name}</a></li>
  </ul>

  )   
})}
</div> 
  </div>

              <li className="navbar-item">
                <Link to="/home" className="navbar-link">Home</Link>
              </li>
              <li className="navbar-item">
                <Link to="/add" className="navbar-link">Add Product</Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button">
                  <FaSignOutAlt /> {/* Logout icon */}
                </button>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/signup" className="navbar-link">Sign Up / Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;