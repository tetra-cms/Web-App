import type { ApiCategoryItem } from "./ApiCategoryItem";

export interface ApiProductItem {
    id: number,
    imageUrl: string,
    name: string,
    description: string,
    price: number,
    categoryId: number,
    categoryInfo?: ApiCategoryItem
}