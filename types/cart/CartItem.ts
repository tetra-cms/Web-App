import type { ApiProductItem } from "../api/ApiProductItem";

export interface CartItem {
    productInfo: ApiProductItem,
    quantity: number
};