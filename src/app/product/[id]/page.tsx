"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IProduct } from '../../../types/productInterface';
import { IResponse } from '../../../types/productInterface';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';

const Container = styled.div`
  padding: 15px;
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const ProductImage = styled.img`
  margin: 0 auto;
  width: 20%;
  height: auto;
  object-fit: cover;
`;

const ProductTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
`;

const ProductInfo = styled.p`
  font-size: 16px;
  text-align: left;

  span{
    font-weight: bold;
  }
`;
const ProductDetails = () => {
  const { data: session } = useSession();
  const { id } = useParams(); 
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const traduction = useTranslations('CardDetails');
  useEffect(() => {
    const fetchProductDetails = async () => {
        if (!session?.access_token) return;

        const token = session.access_token;
        console.log(token)
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        });

        const data: IResponse<IProduct> = await response.json();
        
        console.log(data)
        
        if (response.ok && data.data) {
          console.log(data.data)  
          setProduct(data.data);
        } else {
          console.error('Error:', data.error);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id, session]);

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!product) {
    return <p>No se encontraron los detalles del producto.</p>;
  }

  return (
    <Container>
      <ProductTitle>{product.title}</ProductTitle>
      <ProductImage src={product.image} alt={product.title} />
      <ProductInfo><span>{traduction('description')}:</span> {product.description}</ProductInfo>
      <ProductInfo><span>{traduction('price')}:</span> ${product.price}</ProductInfo>
      <ProductInfo><span>{traduction('category')}:</span> {product.category}</ProductInfo>
      <ProductInfo><span>{traduction('rate')}:</span> {product.rating.rate}</ProductInfo>
      <ProductInfo><span>{traduction('count')}:</span> {product.rating.count}</ProductInfo>
    </Container>
  );
};

export default ProductDetails;
