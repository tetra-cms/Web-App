import type { ApiCategoryItem } from "./ApiCategoryItem";

export interface ApiProductItem {
    id: number,
    imageUrl: string,
    name: string,
    description: string,
    price: number,
    supply_quantum: number,
    categoryId: number,
    categoryInfo?: ApiCategoryItem
}