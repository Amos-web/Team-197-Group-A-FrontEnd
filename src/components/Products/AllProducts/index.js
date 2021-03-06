// Modules
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Utils
import "./allProducts.css";
import search from "../../../utils/search";

// Components
import AddToCart from "../../Cart/AddToCart";

const Products = ({ products }) => {
  const history = useHistory();

  if (products.length === 0) {
    products = JSON.parse(window.localStorage.getItem("products"));
  }

  // State.
  // const [products, setProducts] = useState([]);
  const [needle, setNeedle] = useState("");
  const [searchReport, setSearchReport] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onClickCardHandler = (id) => {
    history.push(`/products/${id}`);
  };
  
  const onChangeHandler = (evt) => {
    setNeedle(evt.target.value);
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    if (needle.length === 0) {
      setSearchReport("Nothing Found!");
      return;
    } else {
      const results = search(needle, products);
      setNeedle("");
      setSearchResults(results);
    
      let found;
      switch (results.length) {
        case 0:
          found = "No Items Found!";
          setSearchReport(found);
          break;
        case 1:
          found = "1 Item Found";
          setSearchReport(found);
          break;
        default:
          found = `${results.length} Items Found`;
          setSearchReport(found);
      } // switch
    } // else
  }; // onSubmitHandler

  // Render the fetched products by default.
  // If there are any search results, render those instead.
  const itemsToRender = searchResults.length > 0 ? searchResults : products;

  const productsDOM =
    itemsToRender &&
    itemsToRender.map((product) => (
      <div 
        className="product-card" 
        key={product.id}
        onClick={() => onClickCardHandler(product.id)}
      >
        <b>{product.title}</b>
        <br />
        <img
          src={product.image}
          alt={product.title}
          style={{
            height: 100,
            width: 150,
            padding: 3,
          }}
        />
        <br />
        <span className="labels">Price: </span>
        {product.price}
        <br />
        <span className="labels">Description: </span>
        {product.description && String(product.description).substring(0, 180)}
        <br />
        <span className="labels">Category: </span>
        {product.category && product.category}
        <br />
        <br />
        <br />
        <AddToCart className="add-to-cart" id={product.id} />
      </div>
    )); // products.map

  return (
    <>
      <div className="search-area">
        <div>
          <span id="searchResultsReport">{searchReport && searchReport}</span>
        </div>
        <form onSubmit={onSubmitHandler}>
          <input
            className="search"
            type="text"
            name="search"
            placeholder="Search Products"
            value={needle}
            onChange={onChangeHandler}
          />
          <button type="submit" className="go-search">
            Go..
          </button>
        </form>
      </div>

      <div className="products-view">
        <div className="products">{productsDOM}</div>
      </div>
    </>
  ); // return
}; // Products

export default Products;

// Endpoint:
// GET /products
