import { NextResponse } from 'next/server';
import { IProduct } from '../../../../types/productInterface';

export interface IResponse<T> {
  status: number;        
  data?: T;              
  error?: string;        
}
export async function POST(request: Request) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
  
    try {
      const productData: IProduct = await request.json();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData), 
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json({ status: res.status, error: errorData.message || 'Error al enviar el checkout'  });
      }
  
      const createdProduct: IProduct = await res.json();
      console.log(createdProduct)
      return NextResponse.json( { status: 201, data: createdProduct });
    } catch (error) {
      return NextResponse.json({ status: 500, error: 'Error inesperado'});
    }
  }
  