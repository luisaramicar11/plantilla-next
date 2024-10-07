import { NextResponse } from "next/server";
import { IProduct } from '../../../../../types/productInterface';
import { IResponse } from '../../../../../types/productInterface'; 

export async function GET(request: Request, { params }: { params: { id: string } }): Promise<IResponse<IProduct>> {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData: { message?: string } = await response.json();
            return NextResponse.json({ status: response.status, error: errorData.message || 'Fallo al dar me gusta a un producto' });
        }

        const data: IProduct = await response.json();
        return NextResponse.json({ status: 200, data }); 
    } catch (error: unknown) {
        console.error('Error dando me gusta:', error);
        return NextResponse.json({ status: 500, error: 'An unexpected error occurred' });
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

        return NextResponse.json({ status: 200, data: null }); // Ajuste a la interfaz
    } catch (error: unknown) {
        console.error('Error borrando like:', error);
        return NextResponse.json({ status: 500, error: 'Un error inesperado ocurrio' });
    }
}