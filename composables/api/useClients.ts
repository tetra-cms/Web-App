import { useApi } from "../useApi";

export const useClients = () => {

    const api = useApi();

    const getAll = () =>
        api("/clients");

    const getById = (id: number) =>
        api(`/clients/${id}`);

    const create = (body: any) =>
        api("/clients", {
            method: "POST",
            body,
        });

    const update = (id: number, body: any) =>
        api(`/clients/${id}`, {
            method: "PUT",
            body,
        });

    const remove = (id: number) =>
        api(`/clients/${id}`, {
            method: "DELETE",
        });

    return {
        getAll,
        getById,
        create,
        update,
        remove,
    };
};