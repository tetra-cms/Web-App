import { defineStore } from "pinia";

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface UserCredentials {
    accessToken: string;
    refreshToken: string;
}

export const useUserStore = defineStore("user", () => {
    const config = useRuntimeConfig();

    const credentials = ref<UserCredentials | null>(null);

    const user = ref<User | null>(null);

    const isAuthenticated = computed(
        () => credentials.value !== null
    );

    function saveCredentials(tokens: UserCredentials) {
        credentials.value = tokens;

        if (import.meta.client) {
            localStorage.setItem(
                "user_credentials",
                JSON.stringify(tokens)
            );
        }
    }

    function clearCredentials() {
        credentials.value = null;
        user.value = null;

        if (import.meta.client) {
            localStorage.removeItem("user_credentials");
        }
    }

    function loadCredentials() {
        if (!import.meta.client) return;

        const raw = localStorage.getItem("user_credentials");

        if (!raw) return;

        try {
            credentials.value = JSON.parse(raw);
        } catch {
            localStorage.removeItem("user_credentials");
        }
    }

    async function login(tokens: UserCredentials) {
        saveCredentials(tokens);

        await fetchUser();
    }

    async function refresh(): Promise<boolean> {
        if (!credentials.value) {
            return false;
        }

        try {
            const tokens = await $fetch<UserCredentials>("/auth/refresh", {
                baseURL: config.public.baseURL,
                method: "POST",
                body: {
                    refreshToken: credentials.value.refreshToken,
                },
            });

            saveCredentials(tokens);

            return true;
        } catch {
            clearCredentials();

            return false;
        }
    }

    async function fetchUser(retry = true) {
        if (!credentials.value) return;

        try {
            user.value = await $fetch<User>("/auth/me", {
                baseURL: config.public.baseURL,
                headers: {
                    Authorization: `Bearer ${credentials.value.accessToken}`,
                },
            });
        } catch (error: any) {

            if (error?.status === 401 && retry) {

                const refreshed = await refresh();

                if (refreshed) {
                    return fetchUser(false);
                }
            }

            await logout(false);
        }
    }

    async function logout(sendRequest = true) {

        if (sendRequest && credentials.value) {

            try {

                await $fetch("/auth/logout", {
                    baseURL: config.public.baseURL,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${credentials.value.accessToken}`,
                    },
                    body: {
                        refreshToken: credentials.value.refreshToken,
                    },
                });

            } catch {
                //
            }
        }

        clearCredentials();

        await navigateTo("/auth");
    }

    return {
        credentials,
        user,
        isAuthenticated,

        loadCredentials,

        login,
        logout,
        refresh,
        fetchUser,
    };
});