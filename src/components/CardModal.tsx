import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../redux/store';
import { clearCart, removeItem, CartItem } from '../redux/slices/cartSlice';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const TotalPrice = styled.p`
  font-weight: bold;
  margin-top: 20px;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

interface CartModalProps {
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    onClose(); 
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>Carrito</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item: CartItem) => (
            <CartItemContainer key={item.id}>
              <span>{item.title} (x{item.quantity})</span>
              <span>${item.price * item.quantity}</span>
              {/* Botón para eliminar artículo */}
              <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                Eliminar
              </RemoveButton>
            </CartItemContainer>
          ))
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
        <TotalPrice>Total: ${totalPrice}</TotalPrice>
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
        {cartItems.length > 0 && (
          <CloseButton onClick={handleClearCart}>Vaciar Carrito</CloseButton>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CartModal;