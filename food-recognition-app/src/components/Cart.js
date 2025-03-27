import React from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  color: #333;
`;

const ItemPrice = styled.p`
  font-size: 1.1rem;
  color: #8D3D29;
`;

function Cart() {
  // Example cart items (replace with actual cart data)
  const cartItems = [
    { id: 1, name: 'Product 1', price: 'RS. 350' },
    { id: 2, name: 'Product 2', price: 'RS. 450' },
  ];

  return (
    <CartContainer>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <CartItem key={item.id}>
          <ItemName>{item.name}</ItemName>
          <ItemPrice>{item.price}</ItemPrice>
        </CartItem>
      ))}
    </CartContainer>
  );
}

export default Cart;