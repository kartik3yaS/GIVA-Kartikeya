import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/productList";
import AddProductForm from "./components/addProductForm";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route
            path="/add"
            element={<AddProductForm onProductAdded={handleProductAdded} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
