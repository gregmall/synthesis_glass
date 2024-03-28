import React from "react";
import { BrowserRouter as Router,
  Route,
  Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from './components/About'
import './App.css'
import Glass from "./components/Glass";
import AddProduct from "./components/AddProduct";
function App() {

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/glass' element={<Glass />} />
          <Route path='/addproduct' element={<AddProduct />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
