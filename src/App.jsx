import React from "react";
import { BrowserRouter as Router,
  Route,
  Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from './components/About'
import './App.css'
import Glass from "./components/Glass";
function App() {

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/glass' element={<Glass />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
