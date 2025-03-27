import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

// Styled components
const HeaderContainer = styled.header`
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

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px 50px;
  background-color: #f9f9f9;
  border-top: 1px solid #eaeaea;
  margin-top: 40px;
`;

const FeatureBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 25%;
  padding: 10px;
`;

const FeatureIcon = styled.div`
  margin-bottom: 15px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const FeatureText = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`;

function HomeHeader() {
  return (
    <>
      <Header />
      
      {/* Features Section */}
      <FeaturesContainer>
        <FeatureBox>
          <FeatureIcon>
            {/* Add an icon or image for Free Shipping */}
            <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45 10H35V2.5C35 1.12 33.88 0 32.5 0H17.5C16.12 0 15 1.12 15 2.5V10H5C2.24 10 0 12.24 0 15V35C0 37.76 2.24 40 5 40H45C47.76 40 50 37.76 50 35V15C50 12.24 47.76 10 45 10ZM17.5 2.5H32.5V10H17.5V2.5ZM47.5 35C47.5 36.38 46.38 37.5 45 37.5H5C3.62 37.5 2.5 36.38 2.5 35V15C2.5 13.62 3.62 12.5 5 12.5H45C46.38 12.5 47.5 13.62 47.5 15V35Z" fill="black"/>
              <path d="M10 20H7.5V22.5H10V20Z" fill="black"/>
              <path d="M15 20H12.5V22.5H15V20Z" fill="black"/>
              <rect x="5" y="25" width="17.5" height="2.5" fill="black"/>
              <rect x="5" y="30" width="10" height="2.5" fill="black"/>
              <rect x="25" y="25" width="17.5" height="2.5" fill="black"/>
              <rect x="32.5" y="30" width="10" height="2.5" fill="black"/>
              <rect x="3.75" y="15" width="42.5" height="2.5" fill="black"/>
              <text x="25" y="8" textAnchor="middle" fontSize="5" fill="black">FREE</text>
            </svg>
          </FeatureIcon>
          <FeatureTitle>Free Shipping</FeatureTitle>
          <FeatureText>Enjoy free shipping on all orders! Shop now and save on delivery costs</FeatureText>
        </FeatureBox>

        <FeatureBox>
          <FeatureIcon>
            {/* Add an icon or image for Safe And Secure Deliveries */}
            <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 0C11.19 0 0 11.19 0 25C0 38.81 11.19 50 25 50C38.81 50 50 38.81 50 25C50 11.19 38.81 0 25 0ZM25 45C13.95 45 5 36.05 5 25C5 13.95 13.95 5 25 5C36.05 5 45 13.95 45 25C45 36.05 36.05 45 25 45Z" fill="black"/>
              <path d="M35 17.5H30V12.5C30 11.12 28.88 10 27.5 10H22.5C21.12 10 20 11.12 20 12.5V17.5H15C13.62 17.5 12.5 18.62 12.5 20V25C12.5 26.38 13.62 27.5 15 27.5H20V32.5C20 33.88 21.12 35 22.5 35H27.5C28.88 35 30 33.88 30 32.5V27.5H35C36.38 27.5 37.5 26.38 37.5 25V20C37.5 18.62 36.38 17.5 35 17.5ZM35 25H27.5V32.5H22.5V25H15V20H22.5V12.5H27.5V20H35V25Z" fill="black"/>
            </svg>
          </FeatureIcon>
          <FeatureTitle>Safe And Secure Deliveries</FeatureTitle>
          <FeatureText>Experience peace of mind with our safe and secure delivery service</FeatureText>
        </FeatureBox>

        <FeatureBox>
          <FeatureIcon>
            {/* Add an icon or image for Organic Products */}
            <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 0C11.19 0 0 11.19 0 25C0 38.81 11.19 50 25 50C38.81 50 50 38.81 50 25C50 11.19 38.81 0 25 0ZM25 45C13.95 45 5 36.05 5 25C5 13.95 13.95 5 25 5C36.05 5 45 13.95 45 25C45 36.05 36.05 45 25 45Z" fill="black"/>
              <path d="M25 12.5C18.1 12.5 12.5 18.1 12.5 25C12.5 31.9 18.1 37.5 25 37.5C31.9 37.5 37.5 31.9 37.5 25C37.5 18.1 31.9 12.5 25 12.5ZM25 35C19.48 35 15 30.52 15 25C15 19.48 19.48 15 25 15C30.52 15 35 19.48 35 25C35 30.52 30.52 35 25 35Z" fill="black"/>
              <path d="M30 22.5H27.5V17.5C27.5 16.12 26.38 15 25 15C23.62 15 22.5 16.12 22.5 17.5V25C22.5 26.38 23.62 27.5 25 27.5H30C31.38 27.5 32.5 26.38 32.5 25C32.5 23.62 31.38 22.5 30 22.5Z" fill="black"/>
            </svg>
          </FeatureIcon>
          <FeatureTitle>Organic Products</FeatureTitle>
          <FeatureText>All our products are 100% organic and naturally grown without harmful chemicals</FeatureText>
        </FeatureBox>

        <FeatureBox>
          <FeatureIcon>
            {/* Add an icon or image for Reasonable Prices */}
            <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45 7.5H5C2.24 7.5 0 9.74 0 12.5V32.5C0 35.26 2.24 37.5 5 37.5H45C47.76 37.5 50 35.26 50 32.5V12.5C50 9.74 47.76 7.5 45 7.5ZM47.5 32.5C47.5 33.88 46.38 35 45 35H5C3.62 35 2.5 33.88 2.5 32.5V12.5C2.5 11.12 3.62 10 5 10H45C46.38 10 47.5 11.12 47.5 12.5V32.5Z" fill="black"/>
              <path d="M45 15H5V17.5H45V15Z" fill="black"/>
              <path d="M15 25H7.5V27.5H15V25Z" fill="black"/>
              <path d="M30 25H20V27.5H30V25Z" fill="black"/>
            </svg>
          </FeatureIcon>
          <FeatureTitle>Reasonable Prices</FeatureTitle>
          <FeatureText>Quality products at affordable prices that respect your budget</FeatureText>
        </FeatureBox>
      </FeaturesContainer>

      <Footer />
    </>
  );
}

export default HomeHeader;