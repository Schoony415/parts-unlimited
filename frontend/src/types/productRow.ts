import {Product} from "./product";

export type ProductRow = {
    checked: boolean;
    addCount: number;
    subtractCount: number;

} & Product;
