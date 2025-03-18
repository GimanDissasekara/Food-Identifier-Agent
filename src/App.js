import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import ImageUploader from './components/ImageUploader';
import IngredientPredictor from './components/IngredientPredictor';
import RecipeExpertSystem from './components/RecipeExpertSystem';

// Styled components
const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.2rem;
`;

const Navigation = styled.nav`
  margin: 20px 0;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 15px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #4285f4;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 8px 15px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function App() {
  const [predictedIngredient, setPredictedIngredient] = useState(null);

  const handleIngredientPredicted = (ingredient) => {
    setPredictedIngredient(ingredient);
  };

  return (
    <Router>
      <AppContainer>
        <Header>
          <Title>Food Recognition & Recipe System</Title>
          <Navigation>
            <NavList>
              <NavItem>
                <NavLink to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/recipes">Recipes</NavLink>
              </NavItem>
            </NavList>
          </Navigation>
        </Header>

        <Routes>
          <Route 
            path="/" 
            element={<IngredientPredictor onIngredientPredicted={handleIngredientPredicted} />} 
          />
          <Route 
            path="/recipes" 
            element={<RecipeExpertSystem predictedIngredient={predictedIngredient} />} 
          />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;