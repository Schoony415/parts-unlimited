import axios from "axios";
import {Product} from "./types/product";

export async function createProduct(product: string): Promise<Product> {
    return (await axios.post<Product>("/products", product, {headers: {'Content-Type': 'text/plain'}})).data
}

export async function getProducts(): Promise<Product[]> {
    return (await axios.get<Product[]>("/products")).data
}

export async function updateProducts(products: Product[]): Promise<void> {
    await axios.patch<Product[]>("/products", products)
}
