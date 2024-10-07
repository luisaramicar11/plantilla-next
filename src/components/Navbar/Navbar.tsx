"use client";
import { signOut, useSession } from 'next-auth/react';
import { FavoritesLink, NavbarContainer, NavLink, SignoutButton, Container } from './NavbarStyle';
import { useTranslations } from 'next-intl';
import SelectLanguage from '@/components/UI/SelectLanguage/SelectLanguage';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CartModal from '../CardModal';

const Navbar = () => {
  const { data: session } = useSession();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const traduction = useTranslations('Navbar');

  const favoriteCount = useSelector((state: RootState) => state.favorites.items.length);
  // Estado para el modal
  const [isCartModalOpen, setCartModalOpen] = useState(false);

  const handleCartClick = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  return (
    <NavbarContainer>
      <Container>
        <NavLink href="/">{traduction('home')}</NavLink>
        
        {session?.user ? (
          <>
            <NavLink href="/dashboard">{traduction('dashboard')}</NavLink>
            <FavoritesLink href="/favorites">
          Favoritos ({favoriteCount})
        </FavoritesLink>
        <NavLink href="#" onClick={handleCartClick}>🛒 {traduction('cart')} ({cartItems.length})</NavLink>
            <SignoutButton onClick={() => signOut()}>{traduction('logout')}</SignoutButton>
            <SelectLanguage />
          </>
        ) : (
          <>
            <NavLink href="/login">{traduction('login')}</NavLink>
            <NavLink href="/register">{traduction('register')}</NavLink>
            <SelectLanguage />
          </>
        )}
      </Container>
      {isCartModalOpen && <CartModal onClose={closeCartModal} />}
    </NavbarContainer>
  );
};

export default Navbar;