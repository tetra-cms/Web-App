<script setup lang="ts">
import { storeToRefs } from "pinia";
import PersonIcon from "~/assets/svg/person.svg";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const { user } = storeToRefs(userStore);

if (import.meta.client && userStore.credentials && !user.value) {
    try {
        await userStore.fetchUser();
    } catch {
        userStore.logout();
    }
}
</script>

<template>
    <div
        v-if="user"
        class="flex flex-row items-center px-[10px] py-[10px]"
    >
        <PersonIcon
            class="[&>*]:fill-secondary-wrapper-dark [&>*]:w-[20px] [&>*]:h-[24px] mr-[10px]"
        />

        <div class="flex flex-col">
            <p class="font-bold">
                {{
                    user.username.length > 10
                        ? user.username.substring(0, 10) + "..."
                        : user.username
                }}
            </p>

            <p>
                {{
                    user.email.length > 10
                        ? user.email.substring(0, 10) + "..."
                        : user.email
                }}
            </p>
        </div>
    </div>
</template>