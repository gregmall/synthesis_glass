import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import UserContextProvider from "./context/UserContextProvider";
import './App.css';

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import('./components/About'));
const Glass = lazy(() => import("./components/Products/Glass"));
const GlassDetail = lazy(() => import("./components/Products/GlassDetail"));
const AddProduct = lazy(() => import("./components/Admin/AddProduct"));
const SignUp = lazy(() => import("./components/SignUp"));
const SignIn = lazy(() => import("./components/SignIn"));
const FourOFour = lazy(() => import("./components/FourOFour"));
const ShoppingCart = lazy(() => import("./components/Checkout/ShoppingCart"));
const AdminPage = lazy(() => import("./components/Admin/AdminPage"));
const Account = lazy(() => import("./components/Account"));
const FormSubmissions = lazy(() => import("./components/Admin/FormSubmissions"));
const Orders = lazy(() => import("./components/Admin/Orders"));
const CompletedOrders = lazy(() => import("./components/Admin/CompletedOrders"));
const QuestionForm = lazy(() => import("./components/QuestionForm"));
const Complete = lazy(() => import("./components/Checkout/Complete"));

export default function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Navbar />
          <Suspense fallback={<div />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/glass' element={<Glass />} />
              <Route path='/item/:id' element={<GlassDetail />} />
              <Route path='/addproduct' element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
              <Route path='/admin' element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
              <Route path='/formsubmissions' element={<ProtectedRoute><FormSubmissions /></ProtectedRoute>} />
              <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path='/completedorders' element={<ProtectedRoute><CompletedOrders /></ProtectedRoute>} />
              <Route path='/account/:id' element={<Account />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/404' element={<FourOFour />} />
              <Route path='/cart' element={<ShoppingCart />} />
              <Route path='/question-form' element={<QuestionForm />} />
              <Route path='/complete' element={<Complete />} />
            </Routes>
          </Suspense>
        </Router>
      </UserContextProvider>
    </div>
  );
}
