import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import { createWrapper } from 'next-redux-wrapper';
import { IProduct } from '../types/productInterface';
import favoritesReducer from './slices/favoriteSlice';


interface CartState {
  items: IProduct[];
  totalQuantity: number;
  totalPrice: number;
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['items'], 
};


const persistedReducer = persistReducer(persistConfig, cartReducer);
const persistedReducerFavorites = persistReducer(persistConfig, favoritesReducer);


export const createStore = () =>
  configureStore({
    reducer: {
      cart: persistedReducer,
      favorites: persistedReducerFavorites,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, 
      }),
  });


export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper<AppStore>(createStore);
export const store = createStore(); 
export const persistor = persistStore(store);

