import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Components/Products";
import { ThemeProvider } from "@mui/styles";
import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { commerce } from "./lib/commerce";
import Cart from "./Components/Cart/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Components/CheckoutForm/Checkout/Checkout";

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  };

  const handleUpdate = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Routes>
            <Route
              path='/'
              element={
                <Products
                  products={products}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path='/cart'
              element={
                <Cart
                  cart={cart}
                  handleUpdate={handleUpdate}
                  handleEmptyCart={handleEmptyCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              }
            />
            <Route
              path='/checkout'
              element={
                <Checkout
                  cart={cart}
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                />
              }
            />
          </Routes>
          <Navbar cart={cart} />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
