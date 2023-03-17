import { ICategoryResponce } from "../category/category.interface";

export interface IProductRequest{
    category: ICategoryResponce;
    name: string;
    path: string;
    ingredients: string;
    weight: string;
    price: string;
    imagePath: string;
}

export interface IProductResponce extends IProductRequest{
    id: number;
}