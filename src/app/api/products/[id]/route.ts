import { NextResponse } from "next/server";
import { IProduct } from '../../../../types/productInterface';
import { IResponse } from '../../../../types/productInterface'; 

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
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/products/${idNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData: { message?: string } = await response.json();
            return NextResponse.json({ status: response.status, error: errorData.message || 'Failed to fetch product' });
        }

        const data: IProduct = await response.json();
        return NextResponse.json({ status: 200, data }); 
    } catch (error: unknown) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ status: 500, error: 'An unexpected error occurred' });
    }
}



