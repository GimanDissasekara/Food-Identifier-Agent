import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: #222;
  color: #fff;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
`;

const FooterDivider = styled.div`
  height: 1px;
  background-color: #444;
  margin: 20px 0;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const FooterHeading = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 20px;
  font-weight: 500;
  color: #fff;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 12px;
`;

const FooterLink = styled.a`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;
  
  &:hover {
    color: #fff;
  }
`;

const FooterText = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  color: #ccc;
`;

const BrandSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const BrandName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: 600;
`;

const BottomSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  font-size: 0.8rem;
  color: #888;
`;

const WhatsAppButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25D366;
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 90px;
  right: 20px;
  background-color: #fff;
  color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border: none;
  z-index: 1000;
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <FooterContainer>
        <BrandSection>
          <BrandName>Sri Lankan Authentic Cuisines</BrandName>
          <FooterText>
            Welcome to Sri Lankan Authentic Cuisines, your premier online health food store dedicated to bringing you the finest in herbal remedies, natural food products, and wholesome breakfast items. At Sri Lankan Authentic Cuisines, we believe in the power of nature to nourish, heal, and sustain. Our mission is to provide you and your family with high-quality, natural products that support a healthy and balanced lifestyle.
          </FooterText>
        </BrandSection>
        
        <FooterDivider />
        
        <FooterContent>
          <FooterSection>
            <FooterHeading>Popular Categories</FooterHeading>
            <FooterList>
              <FooterListItem><FooterLink href="#">Teas</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Herbs</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Seeds</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Granola Cereal</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Chutney</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Spreads</FooterLink></FooterListItem>
            </FooterList>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterList>
              <FooterListItem><FooterLink href="#">About Us</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">FAQ's</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Careers</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Contact Us</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Terms Of Services</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Privacy Policy</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Return & Refund Policy</FooterLink></FooterListItem>
            </FooterList>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Get In Touch</FooterHeading>
            <ContactItem>(+92) 304-111-0756</ContactItem>
            <ContactItem>WhatsApp:</ContactItem>
            <ContactItem>(+92) 307-0877708</ContactItem>
            <ContactItem>(+92) 300-0880921</ContactItem>
          </FooterSection>
        </FooterContent>
        
        <FooterDivider />
        
        <BottomSection>
          <FooterText>Design and Developed By Sri Lankan Authentic Cuisines</FooterText>
        </BottomSection>
      </FooterContainer>
      
      <WhatsAppButton>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 0C6.71625 0 0 6.71625 0 15C0 17.5312 0.6375 20.0625 1.9125 22.1625L0.6375 29.0625L7.9125 27.7875C9.88125 28.9312 12.375 29.5688 15 29.5688C23.2837 29.5688 30 22.8525 30 15C30 7.14751 23.2837 0 15 0ZM23.6063 21.1875C23.2837 22.0312 21.8812 22.7462 20.9812 22.875C20.2125 22.9313 19.2562 23.0438 15.7687 21.675C11.4187 19.9313 8.66625 15.5688 8.49375 15.3525C8.32125 15.1363 6.65625 12.9788 6.65625 10.7138C6.65625 8.44876 7.8 7.37376 8.2325 6.93001C8.6075 6.53126 9.15 6.35876 9.6375 6.35876C9.80999 6.35876 9.98249 6.35876 10.1362 6.35876C10.575 6.35876 10.8412 6.35876 11.1637 7.08751C11.5425 7.9875 12.4425 10.2525 12.5012 10.3938C12.56 10.535 12.6188 10.7138 12.5313 10.8863C12.4425 11.0588 12.3837 11.1738 12.2388 11.3463C12.0938 11.5188 11.9237 11.75 11.8062 11.8625C11.6612 12.0063 11.5162 12.15 11.6612 12.4363C11.8062 12.7225 12.4425 13.8 13.4 14.6438C14.6562 15.7188 15.65 16.0625 15.9725 16.2062C16.295 16.35 16.4688 16.2913 16.6412 16.1188C16.8137 15.9463 17.4188 15.225 17.6212 14.9388C17.8238 14.6525 18.0262 14.7113 18.3 14.8275C18.5737 14.9438 20.8375 16.0625 21.1312 16.2062C21.425 16.35 21.6275 16.4088 21.6862 16.5225C21.745 16.695 21.745 17.3 21.425 18.0288C21.1038 18.7 19.9337 19.3625 19.3512 19.425C18.825 19.4837 18.2137 19.7138 15.9137 18.7563C13.1425 17.585 11.4187 14.7113 11.2738 14.495C11.1288 14.2788 9.93125 12.6138 9.93125 10.8863C9.93125 9.15876 10.7587 8.39126 11.05 8.10376C11.3412 7.81626 11.8838 7.70001 12.3837 7.70001C12.5562 7.70001 12.7288 7.70001 12.9012 7.70001C13.34 7.70001 13.6062 7.70001 13.9288 8.42876C14.365 9.67126 15.1337 11.2788 15.1337 11.3625C15.1337 11.4463 15.1337 11.5863 15.0462 11.7C15.0462 11.9312 14.1462 14.8275 16.9925 17.1213C18.5737 18.4225 20.0062 18.7 21.1038 18.9313C21.425 18.99 21.8037 18.99 22.2138 18.9313C22.6825 18.8762 24.0263 18.2313 24.35 17.2437C24.6737 16.2562 24.6737 15.4313 24.5862 15.2588C24.4988 15.0875 24.2963 15.0288 24.0225 14.9125C23.75 14.7962 21.4862 13.6775 21.1925 13.5337C20.8988 13.39 20.6963 13.3313 20.4938 13.5912C20.2913 13.8513 19.6862 14.455 19.5125 14.6438C19.3387 14.8325 19.1363 14.8638 18.8625 14.7475C18.5888 14.6313 17.2162 14.0625 15.595 12.6013C14.3387 11.4688 13.4975 10.0663 13.3237 9.80626C13.15 9.54626 13.3237 9.37376 13.4688 9.20126C13.6138 9.02876 13.7587 8.77001 13.9038 8.59751C14.0487 8.42501 14.1075 8.30876 14.2237 8.13626C14.34 7.96376 14.2812 7.79126 14.2237 7.64751C14.1662 7.50376 13.4688 5.29876 13.1463 4.68001C12.9438 4.29251 12.7413 4.17626 12.4775 4.11751C12.33 4.05876 12.1837 4.05876 12.0375 4.05876C11.8913 4.05876 11.6025 4.05876 11.3675 4.05876C11.1325 4.05876 10.75 4.11751 10.4275 4.37751C10.105 4.63751 9.225 5.41626 9.225 7.62876C9.225 9.84126 10.8325 11.9313 10.9775 12.1038C11.1225 12.2763 13.265 15.7188 16.7038 17.1788C19.9337 18.5952 19.9337 18.0288 20.5962 17.97C21.2588 17.9112 22.9237 17.1788 23.2462 16.4425C23.5688 15.7063 23.5688 15.0875 23.4813 14.9725C23.3938 14.8575 23.1912 14.7987 22.9175 14.6825C22.6438 14.5663 21.5462 14.0212 21.2525 13.8775C20.9588 13.7337 20.7562 13.675 20.5538 13.935C20.3513 14.195 19.8612 14.7412 19.6875 14.93C19.5137 15.1187 19.3113 15.15 19.0375 15.0337C18.7638 14.9175 17.6662 14.5088 16.295 13.2938C15.2262 12.3513 14.5 11.1738 14.3262 10.9137C14.1525 10.6537 14.3262 10.4813 14.4712 10.3087C14.6162 10.1362 14.7612 9.87751 14.9062 9.70501C15.0512 9.53251 15.11 9.41626 15.2262 9.24376C15.3425 9.07126 15.2837 8.89876 15.2262 8.75501C15.1687 8.61126 14.5587 6.75876 14.2362 6.13126C14.0338 5.80001 13.8312 5.68376 13.6288 5.62501C13.425 5.56626 13.2213 5.56626 13.0175 5.56626C12.8137 5.56626 12.525 5.62501 12.2613 5.88501C11.9975 6.14501 10.8412 7.27001 10.8412 9.12251C10.8412 10.975 12.1237 12.7775 12.2688 12.95C12.4138 13.1225 15.3425 18.0288 20.54 19.6575C22.0062 20.2587 23.1625 20.3425 24.0375 20.4263C24.9125 20.51 25.905 20.3962 26.68 20.2113C27.5687 20.0263 29.1187 19.0863 29.4413 18.2988C29.7638 17.5113 29.7638 16.8513 29.6762 16.7362C29.5888 16.6212 29.3862 16.5625 29.1125 16.4462C28.8388 16.33 26.3887 15.1525 26.095 15.0087C25.8012 14.865 25.5988 14.8062 25.3962 15.0662C25.1937 15.3263 24.6162 15.93 24.4425 16.1188C24.2688 16.3075 24.0663 16.3388 23.7926 16.2225C23.5188 16.1063 22.0062 15.5838 20.1688 13.8775C18.7075 12.515 17.7488 10.8575 17.575 10.5975C17.4013 10.3375 17.575 10.165 17.72 9.9925C17.865 9.82001 18.01 9.56126 18.155 9.38876C18.3 9.21626 18.3588 9.10001 18.475 8.92751C18.5913 8.75501 18.5325 8.58251 18.475 8.43876C18.4175 8.29501 17.5475 6.44251 17.225 5.81501C17.0225 5.42751 16.82 5.31126 16.5562 5.25251C16.4088 5.19376 16.2625 5.19376 16.1163 5.19376C15.97 5.19376 15.6812 5.19376 15.4463 5.19376C15.2113 5.19376 14.8288 5.25251 14.5062 5.51251C14.1838 5.77251 13.3037 6.55126 13.3037 8.76376C13.3037 10.9763 14.9112 13.0663 15.0562 13.2388C15.2012 13.4113 17.3437 16.8538 20.7825 18.3138C22.8425 19.3013 23.75 19.3013 24.4125 19.2425C25.075 19.1838 26.74 18.4513 27.0625 17.715C27.385 16.9788 27.385 16.36 27.2975 16.245C27.21 16.13 27.0075 16.0713 26.7337 15.955C26.46 15.8388 24.8787 15.0713 24.585 14.9275C24.2913 14.7838 24.0888 14.725 23.8862 14.985C23.6837 15.245 23.1937 15.7913 23.02 15.98C22.8462 16.1688 22.6438 16.2 22.37 16.0838C22.0962 15.9675 20.9987 15.5588 19.6275 14.3438C18.5588 13.4013 17.8325 12.2238 17.6588 11.9638C17.485 11.7037 17.6587 11.5313 17.8037 11.3588C17.9487 11.1863 18.0937 11.0138 18.2387 10.8413C18.3838 10.6688 18.4425 10.5525 18.5587 10.38C18.675 10.2075 18.6162 10.035 18.5587 9.89126C18.5012 9.74751 17.72 7.61626 17.2975 6.35876C17.0538 5.80001 16.81 5.74251 16.585 5.74251C16.36 5.74251 16.135 5.74251 15.91 5.74251C15.685 5.74251 15.3388 5.80001 15.035 6.06001C14.7312 6.32001 13.5162 7.44501 13.5162 9.29751C13.5162 11.15 14.7988 12.9525 14.9438 13.125C15.0888 13.2975 17.6588 17.4325 21.1925 19.2425C23.1937 20.265 23.9787 20.2838 24.6412 20.2063C25.3038 20.1288 26.68 19.425 27.0025 18.6363C27.325 17.8475 27.325 17.1875 27.2375 17.0725C27.15 16.9575 26.9475 16.8988 26.6737 16.7825C26.4 16.6663 24.6425 15.7525 24.3487 15.6087C24.055 15.465 23.8525 15.4063 23.6063 15.6663C23.045 16.1538 23.9787 20.3013 23.6063 21.1875Z" fill="white"/>
        </svg>
      </WhatsAppButton>
      
      <BackToTopButton onClick={scrollToTop}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3L14 9L12.6 10.4L8 5.8L3.4 10.4L2 9L8 3Z" fill="#333"/>
        </svg>
      </BackToTopButton>
    </>
  );
};

export default Footer;