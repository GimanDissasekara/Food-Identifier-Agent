import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from './Header'; // Import the Header component
import Footer from './Footer';

const ProductDetailsContainer = styled.div`
  display: flex;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 50%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  width: 50%;
  text-align: left;
`;

const ProductName = styled.h2`
  font-size: 2.5rem;
  margin: 20px 0;
  color: #333;
  font-weight: bold;
`;

const ProductPrice = styled.p`
  font-size: 1.8rem;
  color: #8D3D29;
  margin: 10px 0;
  font-weight: bold;
`;

const ProductDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 20px 0;
  line-height: 1.6;
`;

const AmountContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const AmountLabel = styled.label`
  font-size: 1.2rem;
  color: #333;
`;

const AmountInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100px;
  text-align: center;
`;

const TotalPriceBox = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px 0;
  text-align: center;
`;

const TotalPrice = styled.p`
  font-size: 1.8rem;
  color: #8D3D29;
  margin: 0;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const AddToCartButton = styled.button`
  padding: 15px 30px;
  background-color: #8D3D29;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a2c1f;
  }
`;

const BuyNowButton = styled.button`
  padding: 15px 30px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const DeliveryInfo = styled.p`
  font-size: 1rem;
  color: #555;
  margin-top: 20px;
`;

const LoginMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 10px;
`;

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(1); // Default amount is 1
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [showLoginMessage, setShowLoginMessage] = useState(false); // State to show login message

  // Function to extract numeric price from any format
  const extractNumericPrice = (priceValue) => {
    if (typeof priceValue === 'number') return priceValue;
    
    // If it's a string, try to extract the numeric part
    if (typeof priceValue === 'string') {
      // Handle formats like "RS. 350" or "RS.350"
      const match = priceValue.match(/\d+(\.\d+)?/);
      if (match) {
        return parseFloat(match[0]);
      }
    }
    
    // If we can't extract a number, return 0
    console.error('Unable to extract price from:', priceValue);
    return 0;
  };

  // Fetch product details when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        // Extract the numeric price and calculate initial total
        const numericPrice = extractNumericPrice(response.data.price);
        setTotalPrice(numericPrice * amount);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id, amount]);

  // Update total price when amount changes
  useEffect(() => {
    if (product) {
      const numericPrice = extractNumericPrice(product.price);
      setTotalPrice(numericPrice * amount);
    }
  }, [amount, product]);

  // Check if the user is logged in (you can replace this with your actual authentication logic)
  useEffect(() => {
    const token = localStorage.getItem('token'); // Example: Check for a token in localStorage
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  // Handle amount change
  const handleAmountChange = (e) => {
    const newAmount = parseInt(e.target.value, 10);
    if (newAmount > 0) {
      setAmount(newAmount);
    }
  };

  // Handle "Add to Cart" button click
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true); // Show login message
      return; // Stop further execution
    }

    if (product) {
      const numericPrice = extractNumericPrice(product.price);
      
      const cartItem = {
        id: product.id,
        name: product.name,
        price: numericPrice,
        totalPrice: totalPrice,
        amount: amount,
        image: product.image,
      };
      console.log('Added to cart:', cartItem);
      // You can add logic here to send the item to a cart state or backend
    }
  };

  // Handle "Buy It Now" button click
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true); // Show login message
      return; // Stop further execution
    }

    if (product) {
      const numericPrice = extractNumericPrice(product.price);
      
      const orderItem = {
        id: product.id,
        name: product.name,
        price: numericPrice,
        totalPrice: totalPrice,
        amount: amount,
        image: product.image,
      };
      console.log('Buy Now:', orderItem);
      // You can add logic here to handle the "Buy It Now" action
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  // Display price for UI purposes
  const displayPrice = extractNumericPrice(product.price);

  return (
    <div>
      <Header /> {/* Add the Header component here */}
      <ProductDetailsContainer>
        <ProductImage src={product.image} alt={product.name} />
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>RS. {displayPrice}</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>

          {/* Amount Input */}
          <AmountContainer>
            <AmountLabel htmlFor="amount">Amount:</AmountLabel>
            <AmountInput
              type="number"
              id="amount"
              value={amount}
              min="1"
              onChange={handleAmountChange}
            />
          </AmountContainer>

          {/* Total Price Box */}
          <TotalPriceBox>
            <TotalPrice>Total: Rs. {totalPrice.toFixed(2)}</TotalPrice>
          </TotalPriceBox>

          {/* Button Container */}
          <ButtonContainer>
            <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
            <BuyNowButton onClick={handleBuyNow}>Buy It Now</BuyNowButton>
          </ButtonContainer>

          {/* Login Message */}
          {showLoginMessage && (
            <LoginMessage>
              Please <a href="/login">log in</a> to add items to your cart or make a purchase.
            </LoginMessage>
          )}

          {/* Delivery Info */}
          <DeliveryInfo>Estimated Delivery: 2-3 Days from order date</DeliveryInfo>
        </ProductInfo>
      </ProductDetailsContainer>
      <Footer />
    </div>
  );
}

export default ProductDetails;