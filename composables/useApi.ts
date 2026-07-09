import { useUserStore } from "~/stores/user";

let refreshPromise: Promise<boolean> | null = null;

export const useApi = () => {
    const config = useRuntimeConfig();
    const userStore = useUserStore();

    const refreshAccessToken = async (): Promise<boolean> => {
        if (!userStore.credentials) {
            return false;
        }

        if (refreshPromise) {
            return refreshPromise;
        }

        refreshPromise = (async () => {
            try {
                const response = await $fetch<{
                    accessToken: string;
                    refreshToken: string;
                }>("/auth/refresh", {
                    baseURL: config.public.baseURL,
                    method: "POST",
                    body: {
                        refreshToken:
                            userStore.credentials!.refreshToken,
                    },
                });

                await userStore.login(response);

                return true;
            } catch {
                userStore.logout();
                return false;
            } finally {
                refreshPromise = null;
            }
        })();

        return refreshPromise;
    };

    const api = $fetch.create({
        baseURL: config.public.baseURL,

        onRequest({ options }) {
            const token = userStore.credentials?.accessToken;

            if (!token) return;

            options.headers = new Headers(options.headers);

            options.headers.set(
                "Authorization",
                `Bearer ${token}`
            );
        },

        async onResponseError(ctx) {
            if (ctx.response.status !== 401) {
                return;
            }

            await refreshAccessToken();
        },
    });

    return api;
};