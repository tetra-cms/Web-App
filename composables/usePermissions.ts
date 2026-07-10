import { storeToRefs } from "pinia";

import { useUserStore } from "~/stores/user";

export const usePermissions = () => {
    const userStore = useUserStore();

    const { user } = storeToRefs(userStore);

    const isAdminPanelAvailable = computed(() => {
        return (
            user.value?.role.toLowerCase() === "employee" ||
            user.value?.role.toLowerCase() === "admin"
        );
    });

    return {
        isAdminPanelAvailable,
    };
};