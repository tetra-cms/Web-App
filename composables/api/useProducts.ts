import { useApi } from "../useApi";

import type { ApiProductItem } from "~/types/api/ApiProductItem";

export const useProducts = () => {

    const api = useApi();

    const getAll = (categoryId?: number) =>
        api<ApiProductItem[]>("/products", {
            query: {
                category_id: categoryId ?? undefined
            }
        });

    const getById = (id: number) =>
        api<ApiProductItem>(`/products/${id}`);

    return {
        getAll,
        getById,
    };
};