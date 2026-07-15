import type ApiOrder from "~/types/api/ApiOrder";

export const useOrdersApi = () => {
    const api = useApi();

    return {
        getAll: (query?: any) =>
            api("/orders", {
                query,
            }),

        getById: (id: number) =>
            api<ApiOrder>(`/orders/${id}`),

        getMy: (query?: any) =>
            api("/orders/my", {
                query,
            }),
    }
};