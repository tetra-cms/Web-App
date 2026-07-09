import { useApi } from "../useApi";

import type { ApiCategoryItem } from "~/types/api/ApiCategoryItem";

export const useCategories = () => {

    const api = useApi();

    const getAll = () =>
        api<ApiCategoryItem[]>("/categories");

    const getById = (id: number) =>
        api<ApiCategoryItem>(`/categories/${id}`);

    return {
        getAll,
        getById,
    };
};