import type { ApiCreateOrder } from "~/types/api/ApiCreateOrder";
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

        create: (data: ApiCreateOrder) =>
            api("/orders", {
                method: "POST",
                body: data,
            }),
    }
};