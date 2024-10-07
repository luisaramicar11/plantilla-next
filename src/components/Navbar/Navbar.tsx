"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  margin-right: 1rem;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const SignoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 1rem;
  margin-left: 1rem;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;


const Navbar = () => {
  const { data: session } = useSession();


  return (
    <NavbarContainer>
      <Container>
        <NavLink href="/">Home</NavLink>
        
        {session?.user ? (
          <>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <SignoutButton onClick={() => signOut()}>Signout</SignoutButton>
          </>
        ) : (
          <>
            <NavLink href="/login">Login</NavLink>
            <NavLink href="/register">Register</NavLink>
          </>
        )}
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;