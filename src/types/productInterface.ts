export interface IProduct {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    string;
    image:       string;
    rating:      Rating;
}

export interface Rating {
    rate:  number;
    count: number;
}

export interface IResponse<T> {
    status: number; 
    data?: T;     
    error?: string; 
}

export interface CardProps{
    product: IProduct;
}