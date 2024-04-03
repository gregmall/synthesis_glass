import React, {useContext} from "react";
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
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/compat/app'
import { UserContext } from "./config/UserContextProvider";
import { Vortex } from 'react-loader-spinner';



export default function App() {
  const [user, initialising] = useAuthState(firebase.auth());
  console.log(user, 'user')

  if(initialising) {
    return(
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>
         <Vortex />
      </div>

    )
  }
  return (

    <div className="App">
    
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About user={user}/>} />
          <Route path='/glass' element={<Glass />} />
          <Route path='/addproduct' element={<AddProduct user={user}/>}/>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/404' element={<FourOFour />} />
        </Routes>
      </Router>
      
    </div>

   
  );
}


