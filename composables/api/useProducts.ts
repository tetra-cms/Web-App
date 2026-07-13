import { useApi } from "../useApi";

import type { ApiProductItem } from "~/types/api/ApiProductItem";

export const useProducts = () => {

    const api = useApi();

    const getAll = (categoryId?: number, search?: string) =>
        api<ApiProductItem[]>("/products", {
            query: {
                category_id: categoryId ?? undefined,
                search: search ?? undefined
            }
        });

    const getById = async (id: number) => {
        const product = await api<ApiProductItem>(`/products/${id}`);
        product.imageUrl = "api/products/image/" + product.id;
        return product;
    }
        

    return {
        getAll,
        getById,
    };
};