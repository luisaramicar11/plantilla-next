import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/productInterface';
import { toast } from 'react-toastify';

export interface CartItem extends IProduct {
  quantity: number;
}

interface CartState {
    items: CartItem[]; 
    totalQuantity: number; 
    totalPrice: number;    
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem: (state, action: PayloadAction<IProduct>) => {
          const existingItem = state.items.find(item => item.id === action.payload.id);
          if (existingItem) {
              existingItem.quantity += 1; 
              toast.success(`${action.payload.title} agregado al carrito!`);
          } else {
              const newItem: CartItem = { ...action.payload, quantity: 1 };
              state.items.push(newItem);
              toast.success(`${action.payload.title} agregado al carrito!`);
          }
          state.totalQuantity += 1;
          state.totalPrice += action.payload.price;
      },

        removeItem: (state, action: PayloadAction<number>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                    toast.info(`Cantidad de ${existingItem.title} reducida en 1.`);
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload);
                    toast.warn(`${existingItem.title} eliminado del carrito.`);
                }
                state.totalQuantity -= 1;
                state.totalPrice -= existingItem.price;
            }
        },

        updateItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
          const existingItem = state.items.find(item => item.id === action.payload.id);
          if (existingItem) {
              const quantityDifference = action.payload.quantity - existingItem.quantity;
              state.totalQuantity += quantityDifference;
              state.totalPrice += (action.payload.quantity * existingItem.price) - (existingItem.quantity * existingItem.price);
              existingItem.quantity = action.payload.quantity;
              toast.info(`Cantidad de ${existingItem.title} actualizada a ${action.payload.quantity}.`);
          }
      },
      

        // Vaciar el carrito
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            toast.info('Carrito vaciado.');
        },
    },
});


export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;