import React, { useState } from "react";
import Navbar from "./components/Navbar";
import './App.css'
function App() {

  const [nav, setNav] =useState(false)

  const handleNav = () =>{
    setNav(!nav);
  }
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
