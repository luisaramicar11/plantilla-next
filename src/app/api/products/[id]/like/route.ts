import { NextResponse } from "next/server";
import { IProduct } from '../../../../../types/productInterface';
import { IResponse } from '../../../../../types/productInterface'; 

export async function POST(request: Request, { params }: { params: { id: string } } ) {
    const token: string | null = request.headers.get('Authorization');
    if (!token) {
        return NextResponse.json({ status: 401, error: 'Authorization token is missing' });
    }
    const { id } = params;
    const idNumber: number = parseInt(id, 10);

    if (isNaN(idNumber)) {
        return NextResponse.json({ status: 400, error: 'Invalid product ID' });
    }

    try {
      const productData: IProduct = await request.json();
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/products/${idNumber}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData), 
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json({ status: res.status, error: errorData.message || 'Error al agregar me gusta'  });
      }
  
      const createdProduct: IProduct = await res.json();
      console.log(createdProduct)
      return NextResponse.json( { status: 201, data: createdProduct });
    } catch (error) {
      return NextResponse.json({ status: 500, error: 'Error al agregar me gusta'});
    }
  }

export async function DELETE(request: Request, { params }: { params: { id: string } }): Promise<IResponse<null>> {
    const token: string | null = request.headers.get('Authorization');
    if (!token) {
        return NextResponse.json({ status: 401, error: 'Authorization token is missing' });
    }
    const { id } = params;
    const idNumber: number = parseInt(id, 10);

    if (isNaN(idNumber)) {
        return NextResponse.json({ status: 400, error: 'Invalid product ID' });
    }

    try {
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/products/${idNumber}/like`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData: { message?: string } = await response.json();
            return NextResponse.json({ status: response.status, error: errorData.message || 'Fallo al borrar un like de un producto' });
        }

        return NextResponse.json({ status: 200, data: null }); 
    } catch (error: unknown) {
        console.error('Error borrando like:', error);
        return NextResponse.json({ status: 500, error: 'Un error inesperado ocurrio' });
    }
}