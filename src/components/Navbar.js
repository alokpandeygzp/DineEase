import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from "../Modal";
import Cart from "../screens/Cart";
import {useCart} from "./ContextReducer";

export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  let data = useCart();

  const handleLogout = () =>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
<div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand fs-2 fw-bold" to="/">
        GoFood
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2">
          <li className="nav-item">
            <Link className="nav-link fs-5" aria-current="page" to="/">
              Home
            </Link>
          </li>
          {localStorage.getItem("authToken") && (
            <li className="nav-item">
              <Link className="nav-link fs-5" aria-current="page" to="/myOrderData">
                My Orders
              </Link>
            </li>
          )}
        </ul>
        {!localStorage.getItem("authToken") ? (
          <div className="d-flex">
            <Link className="btn btn-outline-light mx-1" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-light mx-1" to="/createuser">
              Sign Up
            </Link>
          </div>
        ) : (
          <div>
            <div className="btn btn-outline-light mx-2" onClick={()=>setCartView(true)}>
              My Cart {" "}
              <Badge pill-bg="danger">{data.length}</Badge>
            </div>
            {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
            <div className="btn btn-outline-danger mx-2" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  </nav>
</div>

  );
}
