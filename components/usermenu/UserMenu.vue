<script setup lang="ts">
import { storeToRefs } from "pinia";

import PersonIcon from "~/assets/svg/person.svg";
import DoorIcon from "~/assets/svg/door.svg";

import type IUserMenuItem from "~/types/usermenu/UserMenuItem";

import { useUserStore } from "~/stores/user";

const props = defineProps<{
    menuItems: IUserMenuItem[];
}>();

const userStore = useUserStore();

const { user, isAuthenticated } = storeToRefs(userStore);

if (import.meta.client && userStore.credentials && !user.value) {
    try {
        await userStore.fetchUser();
    } catch {
        userStore.logout();
    }
}

const { isAdminPanelAvailable } = usePermissions();

const logout = async () => {
    try {
        if (userStore.credentials) {
            await userStore.logout();
        }
        
        await navigateTo("/auth");
    } catch {
        
    }

    userStore.logout();
};
</script>

<template>
    <div
        class="bg-secondary-primary absolute right-0 w-[240px] shadow-xl rounded-[10px] p-[20px] z-[9999]"
    >
        <div
            v-if="isAuthenticated && user"
            class="flex flex-row items-center bg-secondary-light p-[5px] rounded-[10px]"
        >
            <PersonIcon
                class="[&>*]:fill-secondary-wrapper-dark [&>*]:w-[20px] [&>*]:h-[24px]"
            />

            <div class="ml-2">
                <p class="font-bold">
                    {{
                        user.username.length > 10
                            ? user.username.substring(0, 10) + "..."
                            : user.username
                    }}
                </p>

                <p class="text-secondary-wrapper-light">
                    {{
                        user.email.length > 10
                            ? user.email.substring(0, 10) + "..."
                            : user.email
                    }}
                </p>
            </div>
        </div>

        <ul class="my-[10px]">
            <li
                v-if="isAdminPanelAvailable"
                class="flex flex-row items-center hover:[&>*]:fill-primary-primary"
            >
                <NuxtLink
                    to="/admin/"
                    class="flex flex-row items-center transition-all duration-200 hover:[&>*]:fill-primary-primary hover:[&>*]:text-primary-primary"
                >
                    <WrenchIcon class="mr-[5px] w-[20px] h-[20px]" />

                    <p class="font-medium transition-all duration-200">
                        {{ $t("usermenu.admin_panel") }}
                    </p>
                </NuxtLink>
            </li>

            <li
                v-for="item in props.menuItems"
                :key="item.route"
                class="flex flex-row items-center hover:[&>*]:fill-primary-primary"
            >
                <NuxtLink
                    :to="item.route"
                    class="flex flex-row items-center transition-all duration-200 hover:[&>*]:fill-primary-primary hover:[&>*]:text-primary-primary"
                >
                    <component
                        :is="item.icon"
                        class="mr-[5px] w-[20px] h-[20px]"
                    />

                    <p
                        :class="[
                            'font-medium transition-all duration-200',
                            item.color && `text-${item.color}`,
                        ]"
                    >
                        {{ item.label }}
                    </p>
                </NuxtLink>
            </li>

            <li class="flex flex-row items-center hover:[&>*]:fill-primary-primary">
                <button
                    type="button"
                    class="flex flex-row items-center transition-all duration-200 hover:[&>*]:fill-primary-primary hover:[&>*]:text-primary-primary"
                    @click="logout"
                >
                    <DoorIcon class="mr-[5px] w-[20px] h-[20px]" />

                    <p class="font-medium transition-all duration-200">
                        {{ $t("usermenu.logout") }}
                    </p>
                </button>
            </li>
        </ul>
    </div>
</template>