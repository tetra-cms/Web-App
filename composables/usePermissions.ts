import { storeToRefs } from "pinia";

import { useUserStore } from "~/stores/user";

export const usePermissions = () => {
    const userStore = useUserStore();

    const { user } = storeToRefs(userStore);

    const hasRole = (...roles: string[]) => {
        return computed(() => {
            return !!user.value && roles.includes(user.value.role.toLocaleLowerCase());
        });
    };

    return {
        hasRole,
    };
};