export const useUserStore = defineStore('user', {
    state: () => ({
        userProfile: null
    }),
    actions: {
        async storeUserInfo(accessToken: string) : Promise<any> {
            this.userProfile = await $fetch('/user/profile', {
                baseURL: useRuntimeConfig().public.baseURL,
                method: 'GET',
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + accessToken 
                }
            });
        }
    },
});