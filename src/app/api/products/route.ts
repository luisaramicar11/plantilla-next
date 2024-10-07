import { NextResponse } from 'next/server';
import { IProduct } from '../../../types/productInterface';

export interface IResponse<T> {
  status: number;         
  data?: T;              
  error?: string;       
}

async function fetchProductsFromBackend(token: string): Promise<IProduct[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener los productos');
  }

  return res.json();
}

export async function GET(request: Request): Promise<IResponse<IProduct[]>> {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ status: 401, error: 'No autorizado' });
  }

  try {
    const products: IProduct[] = await fetchProductsFromBackend(token);
    return NextResponse.json({ status: 200, data: products }); 
  } catch (error) {
    return NextResponse.json({ status: 500, error: 'Error al obtener los productos' });
  }
}

