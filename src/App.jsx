import React from "react";
import { BrowserRouter as Router,
  Route,
  Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from './components/About'
import Home from "./components/Home";
import './App.css'
import Glass from "./components/Glass";
import AddProduct from "./components/AddProduct";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";



export default function App() {

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/glass' element={<Glass />} />
          <Route path='/addproduct' element={<AddProduct />}/>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}


