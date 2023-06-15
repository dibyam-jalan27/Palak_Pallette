import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Webfont from "webfontloader";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import PaymentSuccess from "./components/Cart/PaymentSuccess";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrdersList from "./components/Admin/OrdersList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UsersList from "./components/Admin/UsersList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReviews from "./components/Admin/ProductReviews.js";
import About from "./components/layout/About/About";
import Contact from "./components/layout/Contact/Contact";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/account" element={<ProtectedRoute />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/me/update" element={<ProtectedRoute />}>
          <Route index element={<UpdateProfile />} />
        </Route>
        <Route path="/password/update" element={<ProtectedRoute />}>
          <Route index element={<UpdatePassword />} />
        </Route>
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ProtectedRoute />}>
          <Route index element={<Shipping />} />
        </Route>
        <Route path="/order/confirm" element={<ProtectedRoute />}>
          <Route index element={<ConfirmOrder />} />
        </Route>
        <Route path="/success" element={<ProtectedRoute />}>
          <Route index element={<PaymentSuccess />} />
        </Route>
        <Route path="/orders" element={<ProtectedRoute />}>
          <Route index element={<MyOrders />} />
        </Route>
        <Route path="/order/:id" element={<ProtectedRoute />}>
          <Route index element={<OrderDetails/>} />
        </Route>
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} />}>
          <Route index element={<Dashboard/>} />
        </Route>
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} />}>
          <Route index element={<ProductList/>} />
        </Route>
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true} />}>
          <Route index element={<NewProduct/>} />
        </Route>
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} />}>
          <Route index element={<UpdateProduct/>} />
        </Route>
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} />}>
          <Route index element={<OrdersList/>} />
        </Route>
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} />}>
          <Route index element={<ProcessOrder/>} />
        </Route>
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} />}>
          <Route index element={<UsersList/>} />
        </Route>
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true} />}>
          <Route index element={<UpdateUser/>} />
        </Route>
        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true} />}>
          <Route index element={<ProductReviews/>} />
        </Route>
        < Route path="/process/payment" element={null}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
