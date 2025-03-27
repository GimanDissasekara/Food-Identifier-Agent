import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProductsContainer = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 15px;
  background-color: #8D3D29;
  color: white;
  border: none;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Handle product deletion
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id)); // Update local state
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <ProductsContainer>
      <h2>Products</h2>
      <Button onClick={() => navigate('/add-product')}>Add Product</Button>
      <Table>
        <thead>
          <tr>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Image</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Activity</TableHeader>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <img src={product.image} alt={product.name} style={{ width: '50px' }} />
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/edit-product/${product.id}`)}>
                  Update
                </Button>
                <Button onClick={() => handleDelete(product.id)}>Delete</Button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </ProductsContainer>
  );
}

export default Products;