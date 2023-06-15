import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
        dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch,error,alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <MetaData title={"PalakPallette"} />
          <div className="banner">
            <p>Welcome to PalakPallette</p>
            <h1>SCROLL TO DISCOVER MY ARTWORKS</h1>
            <a href="#container">
              <button>
                Scroll
                <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Artworks</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard key = {product._id} product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
