"use client";

import { UseSessionOptions } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Session } from "next-auth";


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

// Componente ProductsPage
const ProductsPage: React.FC= () => {
  const { data: session, status }: { data: SessionAuthenticate | null; status: "loading" | "authenticated" | "unauthenticated" } = useSession();

  return (
    <div>
      <h1>Productos</h1>
      
    </div>
  );
};

export default ProductsPage; 