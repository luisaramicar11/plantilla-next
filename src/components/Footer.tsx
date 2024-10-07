"use client"
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #282c34;
  color: white;
  text-align: center;
  padding: 1rem;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.p`
  margin: 0;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>© Riwi all right reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
