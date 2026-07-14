import type ApiContent from "~/types/api/ApiContent";

export const useContentApi = () => {
    const api = useApi();

    return {
        getAll: (query?: any) =>
            api("/content", {
                query,
            }),

        getById: (id: number) =>
            api<ApiContent>(`/content/id/${id}`),

        getByRoute: (route: string) =>
            api<ApiContent>(`/content/${encodeURIComponent(route)}`),
    };
};