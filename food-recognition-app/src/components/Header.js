import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// Styled components (same as before)
const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 30px;
  position: relative;
`;

const TopLeftContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const TopRightContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #4285f4;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialIconLink = styled.a`
  color: #4285f4;
  font-size: 1.2rem;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
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

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <TopLeftContainer>
        <SocialIcons>
          <SocialIconLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </SocialIconLink>
          <SocialIconLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </SocialIconLink>
          <SocialIconLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </SocialIconLink>
        </SocialIcons>
      </TopLeftContainer>
      <TopRightContainer>
        <IconButton onClick={() => navigate('/cart')}>
          <FaShoppingCart />
        </IconButton>
        <IconButton onClick={() => navigate('/register')}>
          <FaUser />
        </IconButton>
      </TopRightContainer>
      <Title>Authentic Flavor</Title>
      <Navigation>
        <NavList>
          <NavItem>
            <NavLink to="/home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/">Get To Know</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/recipes">Recipes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/shop">Shop</NavLink>
          </NavItem>
          
        </NavList>
      </Navigation>
    </HeaderContainer>
  );
}

export default Header;