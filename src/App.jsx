
import { BrowserRouter as Router,
  Route,
  Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import About from './components/About'
import Home from "./components/Home";
import './App.css'
import Glass from "./components/Products/Glass";
import AddProduct from "./components/Admin/AddProduct";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import FourOFour from "./components/FourOFour";
import ProtectedRoute from "./ProtectedRoute";
import ShoppingCart from "./components/Checkout/ShoppingCart";
import AdminPage from "./components/Admin/AdminPage";
import UserContextProvider from "./context/UserContextProvider"
import Account from "./components/Account";
import Checkout from "./components/Checkout/Checkout";
import GlassDetail from "./components/Products/GlassDetail";
import QuestionForm from "./components/QuestionForm";
import Complete from "./components/Checkout/Complete";




export default function App() {


  
  
  return (

    <div className="App">
      
    <UserContextProvider>
        <Router>
          <Navbar />
          {/* <img src="/public/assets/background.png" alt="bg"/> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About/>} />
            <Route path='/glass' element={<Glass />} />
            <Route path='/item/:id' element={<GlassDetail />} />
            <Route path='/addproduct' element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
            <Route path='/admin' element={<ProtectedRoute><AdminPage /></ProtectedRoute>}/>
            <Route path='/account/:id' element={<Account />}/>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/404' element={<FourOFour />} />
            <Route path='/cart' element={<ShoppingCart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/question-form' element={<QuestionForm />}/>
            <Route path='/complete' element={<Complete />}/>
          </Routes>
        </Router>
      </UserContextProvider>
    </div>

   
  );
}


