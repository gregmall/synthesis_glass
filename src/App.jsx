import React from "react";
import { BrowserRouter as Router,
  Route,
  Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import About from './components/About'
import Home from "./components/Home";
import './App.css'
import Glass from "./components/Glass";
import AddProduct from "./components/Admin/AddProduct";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import FourOFour from "./components/FourOFour";
import ProtectedRoute from "./ProtectedRoute";
import ShoppingCart from "./components/ShoppingCart";
import AdminPage from "./components/Admin/AdminPage";
import UserContextProvider from "./context/UserContextProvider";
import Account from "./components/Account";




export default function App() {
  
  
  return (

    <div className="App">
    <UserContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About/>} />
            <Route path='/glass' element={<Glass />} />
            <Route path='/addproduct' element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
            <Route path='/admin' element={<ProtectedRoute><AdminPage /></ProtectedRoute>}/>
            <Route path='/account/:id' element={<Account />}/>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/404' element={<FourOFour />} />
            <Route path='/cart' element={<ShoppingCart />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>

   
  );
}


