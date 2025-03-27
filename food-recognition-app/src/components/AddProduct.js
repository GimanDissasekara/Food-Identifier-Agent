import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AddProductContainer = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
`;

const TextArea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #8D3D29;
  color: white;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;

const SuccessMessage = styled.div`
  color: green;
  margin: 10px 0;
`;

function AddProduct({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('spices');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const newProduct = { name, price, description, image, category };

    axios.post('http://localhost:5000/api/products', newProduct)
      .then((response) => {
        onAdd(response.data); // Update local state
        setSuccess(true);
        setTimeout(() => {
          navigate('/products'); // Navigate back to the products list
        }, 1000); // Wait 1 second before navigating
      })
      .catch((error) => {
        setError('Failed to add product. Please try again.');
        console.error('Error adding product:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AddProductContainer>
      <h2>Add New Product</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>Product added successfully!</SuccessMessage>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input type="file" accept="image/*" onChange={handleImageUpload} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="spices">Spices & Herbs</option>
          <option value="grains">Rice & Grains</option>
          <option value="tools">Cooking Tools</option>
          <option value="condiments">Condiments & Sauces</option>
          <option value="snacks">Snacks & Sweets</option>
        </select>
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </AddProductContainer>
  );
}

export default AddProduct;