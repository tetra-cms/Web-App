<script setup lang="ts">
import { storeToRefs } from "pinia";

import { UserMenuItems } from "~/content/usermenu/UserMenuItems";

import AccountIcon from "~/assets/svg/account.svg";
import DoorIcon from "~/assets/svg/door.svg";

import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const { isAuthenticated } = storeToRefs(userStore);

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
    <MobileOnly>
        <div
            v-if="!isAuthenticated"
            class="h-full flex flex-col justify-center p-[20px]"
        >
            <div class="w-full flex justify-center">
                <AccountIcon
                    class="[&>*]:fill-primary-primary w-[128px] mb-[20px]"
                />
            </div>

            <p class="font-medium mb-[20px] text-center">
                {{ $t("auth.mobile.message") }}
            </p>

            <NuxtLink to="/auth">
                <p
                    class="w-full py-[10px] text-center font-bold text-[12px] bg-primary-primary hover:bg-primary-secondary transition-all duration-300 rounded-[5px] text-secondary-primary"
                >
                    {{ $t("auth.buttons.login") }}
                </p>
            </NuxtLink>
        </div>

        <div v-else>
            <div class="bg-secondary-secondary">
                <ProfileInfo />
            </div>

            <ul>
                <li
                    v-for="item in UserMenuItems"
                    :key="item.route"
                    class="flex flex-row mx-[10px] border-secondary-wrapper-light border-b py-[15px] items-center hover:[&>*]:fill-primary-primary"
                >
                    <NuxtLink
                        :to="item.route"
                        class="flex flex-row items-center transition-all duration-200 hover:[&>*]:fill-primary-primary hover:[&>*]:text-primary-primary"
                    >
                        <component
                            :is="item.icon"
                            class="mr-[10px] w-[22px] h-[22px]"
                        />

                        <p
                            :class="[
                                'font-bold transition-all duration-200',
                                item.color && `text-${item.color}`,
                            ]"
                        >
                            {{ item.label }}
                        </p>
                    </NuxtLink>
                </li>

                <li
                    class="flex flex-row mx-[10px] border-secondary-wrapper-light border-b py-[15px] items-center cursor-pointer hover:[&>*]:fill-tomato-primary"
                    @click="logout"
                >
                    <button
                        type="button"
                        class="flex flex-row items-center w-full text-left"
                    >
                        <DoorIcon class="mr-[10px] w-[22px] h-[22px]" />

                        <p
                            class="text-tomato-primary font-bold transition-all duration-200"
                        >
                            {{ $t("usermenu.logout") }}
                        </p>
                    </button>
                </li>
            </ul>
        </div>
    </MobileOnly>
</template>