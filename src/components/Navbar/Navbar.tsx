"use client";
import { signOut, useSession } from 'next-auth/react';
import { NavbarContainer, NavLink, SignoutButton, Container } from './NavbarStyle';
import { useTranslations } from 'next-intl';
import SelectLanguage from '@/components/UI/SelectLanguage/SelectLanguage';

const Navbar = () => {
  const { data: session } = useSession();
  const traduction = useTranslations('Navbar');

  return (
    <NavbarContainer>
      <Container>
        <NavLink href="/">{traduction('home')}</NavLink>
        
        {session?.user ? (
          <>
            <NavLink href="/dashboard">{traduction('dashboard')}</NavLink>
            <SignoutButton onClick={() => signOut()}>{traduction('logout')}</SignoutButton>
          </>
        ) : (
          <>
            <NavLink href="/login">{traduction('login')}</NavLink>
            <NavLink href="/register">{traduction('register')}</NavLink>
            <SelectLanguage />
          </>
        )}
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;