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
    const credentials = ref<UserCredentials | null>(null);

    const user = ref<User | null>(null);

    const isAuthenticated = computed(
        () => credentials.value !== null
    );

    function loadCredentials() {
        if (!import.meta.client) return;

        const raw = localStorage.getItem("user_credentials");

        if (!raw) return;

        try {
            credentials.value = JSON.parse(raw) as UserCredentials;
        } catch {
            localStorage.removeItem("user_credentials");
        }
    }

    async function login(tokens: UserCredentials) {
        credentials.value = tokens;

        if (import.meta.client) {
            localStorage.setItem(
                "user_credentials",
                JSON.stringify(tokens)
            );
        }

        await fetchUser();
    }

    async function fetchUser() {
        if (!credentials.value) return;

        try {
            user.value = await $fetch<User>("/auth/me", {
                baseURL: useRuntimeConfig().public.baseURL,
                headers: {
                    Authorization: `Bearer ${credentials.value.accessToken}`,
                },
            });
        } catch {
            logout();
        }
    }

    function logout() {
        credentials.value = null;
        user.value = null;

        if (import.meta.client) {
            localStorage.removeItem("user_credentials");
        }

        navigateTo("/auth");
    }

    return {
        credentials,
        user,
        isAuthenticated,
        loadCredentials,
        login,
        logout,
        fetchUser,
    };
});