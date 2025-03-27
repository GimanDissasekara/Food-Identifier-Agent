import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const EditProductContainer = styled.div`
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

function EditProduct() {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('spices');

  // Fetch product details when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setCategory(product.category);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = { name, price, description, image, category };
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);
      navigate('/products'); // Navigate back to the products list
    } catch (error) {
      console.error('Error updating product:', error);
    }
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
    <EditProductContainer>
      <h2>Edit Product</h2>
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
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="spices">Spices & Herbs</option>
          <option value="grains">Rice & Grains</option>
          <option value="tools">Cooking Tools</option>
          <option value="condiments">Condiments & Sauces</option>
          <option value="snacks">Snacks & Sweets</option>
        </select>
        <Button type="submit">Update Product</Button>
      </form>
    </EditProductContainer>
  );
}

export default EditProduct;