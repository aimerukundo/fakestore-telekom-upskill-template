export interface IProduct  {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    cart:number;
    rating: { rate: number; count: number };
    title: string;
  };