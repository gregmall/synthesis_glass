import React from "react";
import { BrowserRouter as Router,
  Route,
  Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import About from './components/About'
import Home from "./components/Home";
import './App.css'
import Glass from "./components/Glass";
import AddProduct from "./components/AddProduct";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import FourOFour from "./components/FourOFour";

import UserContextProvider from "./components/context/UserContextProvider";

import ProtectedRoute from "./ProtectedRoute";
import ShoppingCart from "./components/ShoppingCart";




export default function App() {
  
  // const [user, initialising] = useAuthState(firebase.auth());
  // console.log(user, 'user')
 
  // if(initialising) {
  //   return(
  //     <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>
  //        <Vortex />
  //     </div>

  //   )
  // }
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


