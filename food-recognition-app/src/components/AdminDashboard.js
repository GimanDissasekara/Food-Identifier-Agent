import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';

// Color palette inspired by Sri Lankan cuisine and flag colors
const colors = {
  primary: '#8D3D29', // Cinnamon/spice brown
  secondary: '#F3C622', // Turmeric/curry yellow
  accent: '#006747', // Green from Sri Lankan flag
  light: '#FFF9E6', // Creamy off-white
  dark: '#2A2A2A', // Dark gray for text
  shadow: 'rgba(0, 0, 0, 0.12)'
};

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.light};
  font-family: 'Poppins', sans-serif;
`;

const Header = styled.header`
  background-color: ${colors.primary};
  color: white;
  padding: 20px 40px;
  box-shadow: 0 2px 10px ${colors.shadow};
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

const HeaderSubtitle = styled.p`
  margin: 5px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 40px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px ${colors.shadow};
  padding: 30px;
  text-align: center;
  width: 240px;
  transition: all 0.3s ease;
  border-bottom: 4px solid transparent;

  &:hover {
    transform: translateY(-10px);
    border-bottom: 4px solid ${colors.secondary};
  }
`;

const CardIcon = styled.div`
  background-color: ${colors.light};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  color: ${colors.primary};
  font-size: 24px;
`;

const Title = styled.h2`
  color: ${colors.dark};
  font-size: 18px;
  margin: 0 0 10px 0;
`;

const Description = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

const AdminStats = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px ${colors.shadow};
  padding: 20px;
  margin-bottom: 30px;
`;

const StatBox = styled.div`
  text-align: center;
  padding: 0 20px;
  
  &:not(:last-child) {
    border-right: 1px solid #eee;
  }
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${colors.accent};
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleManageProducts = () => {
    navigate('/add-product');
  };

  const handleAddProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <DashboardContainer>
      <Header>
        <HeaderTitle>Ceylon Flavors Admin Portal</HeaderTitle>
        <HeaderSubtitle>Manage your authentic Sri Lankan cuisine website</HeaderSubtitle>
      </Header>
      <MainContent>
        <CardContainer>
          <Card onClick={() => navigate('/products')}>
            <CardIcon>🍛</CardIcon>
            <Title>Manage Products</Title>
            <Description>Add or update dishes, spice mixes, and cooking ingredients</Description>
          </Card>
          <Card>
            <CardIcon>📦</CardIcon>
            <Title>Manage Orders</Title>
            <Description>View, process, and track customer orders</Description>
          </Card>
          <Card>
            <CardIcon>📣</CardIcon>
            <Title>Manage Ads</Title>
            <Description>Create and monitor promotional campaigns</Description>
          </Card>
        </CardContainer>
      </MainContent>
      
    </DashboardContainer>
  );
}

export default AdminDashboard;