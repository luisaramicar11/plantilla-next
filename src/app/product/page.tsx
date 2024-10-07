"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import { IProduct } from "../../types/productInterface";
import styled from "styled-components";
import { Session } from "next-auth";

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 40px;
`;

const H2 = styled.h2`
  margin-top: 25px;
  text-align: center;
  color: black;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: gray;
`;
interface SessionAuthenticate extends Session {
    access_token: string;
    user:         IUser;   
}

interface IUser {
    _id:      string;
    email:    string;
    username: string;
    name:     string;
    phone:    string;
    __v:      number;
  }

interface IResponse<T> {
    status: number;         // Código de estado HTTP
    data?: T;              // Datos devueltos (puede ser un array de productos, etc.)
    error?: string;        // Mensaje de error (opcional)
  }  

// Componente ProductsPage
const ProductsPage: React.FC= () => {
  const { data: session, status }: { data: SessionAuthenticate | null; status: "loading" | "authenticated" | "unauthenticated" } = useSession();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [ loadingProducts, setLoadingProducts] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!session?.access_token) return;
    
      const token = session.access_token;
    
      try {
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data: IResponse<IProduct[]> = await response.json(); 
    
        if (response.ok) {
          setProducts(data.data || []); 
          console.log(data.data); 
        } else {
          console.error('Error:', data.error || 'Error desconocido'); 
        }
      } catch (error) {
        console.error('Error de la API:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (status === 'authenticated') {
      fetchProducts();
    }
  }, [session, status]);

  return (
    <div>
      <H2>Productos</H2>
      <Div>
        {loadingProducts ? (
          <LoadingMessage>Cargando productos...</LoadingMessage>
        ) : products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <LoadingMessage>No hay productos disponibles</LoadingMessage>
        )}
      </Div>
    </div>
  );
};

export default ProductsPage; 