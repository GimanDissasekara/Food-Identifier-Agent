import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ImageUploader from './components/ImageUploader';
import IngredientPredictor from './components/IngredientPredictor';
import RecipeExpertSystem from './components/RecipeExpertSystem';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Shop from './components/Shop';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import EditProduct from './components/EditProduct';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';

function App() {
  const [predictedIngredient, setPredictedIngredient] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleIngredientPredicted = (ingredient) => {
    setPredictedIngredient(ingredient);
  };

  // Function to handle adding a new product
  const handleAddProduct = (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // Function to handle updating a product
  const handleUpdateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // Function to handle deleting a product
  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // Function to handle user login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<IngredientPredictor onIngredientPredicted={handleIngredientPredicted} />}
        />
        <Route
          path="/recipes"
          element={<RecipeExpertSystem predictedIngredient={predictedIngredient} />}
        />
        <Route path="/main" element={<div>Main Page Content</div>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route
          path="/add-product"
          element={<AddProduct onAdd={handleAddProduct} />} // Pass onAdd function
        />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
            />
          }
        />
        {/* New Routes for Register, Login, and Cart */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Pass login handler */}
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} // Protect cart route
        />
        {/* Forgot Password Route (optional) */}
        <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;