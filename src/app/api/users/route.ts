// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { IResponseCreateUser, IUserRegistered } from '../../../types/userInterface';

export async function createUser(userData: IUserRegistered): Promise<IResponseCreateUser> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!res.ok) {
      throw new Error('Error al crear el usuario');
    }
  
    return res.json();
  }
  

