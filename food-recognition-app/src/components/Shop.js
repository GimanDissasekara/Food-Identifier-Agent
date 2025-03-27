import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ShopContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  color: #8D3D29;
  margin: 5px 0;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 10px 0;
`;

const ViewButton = styled.button`
  padding: 10px 15px;
  background-color: #8D3D29;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;

  &:hover {
    background-color: #6a2c1f;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
`;

const CategorySelect = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Categories for Sri Lankan food shop
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'spices', name: 'Spices & Herbs' },
    { id: 'grains', name: 'Rice & Grains' },
    { id: 'condiments', name: 'Condiments & Sauces' },
    { id: 'snacks', name: 'Snacks & Sweets' }
  ];

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

  // Handle "View" button click
  const handleViewProduct = (id) => {
    navigate(`/product/${id}`); // Navigate to the product details page
  };

  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <Header />
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CategorySelect value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </CategorySelect>
      </FilterContainer>
      <ShopContainer>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>
            <ViewButton onClick={() => handleViewProduct(product.id)}>
              View
            </ViewButton>
          </ProductCard>
        ))}
      </ShopContainer>
      <Footer /> {/* Footer added here */}
    </div>
  );
}

export default Shop;