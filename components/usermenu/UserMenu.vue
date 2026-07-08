<script setup lang="ts">
import PersonIcon from '~/assets/svg/person.svg';
import type IUserMenuItem from '~/types/usermenu/UserMenuItem';
import DoorIcon from '~/assets/svg/door.svg';

import { useUserStore } from '~/store/user';

const props = defineProps<{
    menuItems: Array<IUserMenuItem>
}>();

const userStore = useUserStore();
const accessToken = useCookie("access_token");
if (accessToken.value && !userStore.$state.userProfile)
{
    try {
        await userStore.storeUserInfo(String(accessToken.value));
    } catch {
        useClearSession();
    }
    
}
const userInfo = storeToRefs(userStore);
</script>

<template>
    <div class="bg-secondary-primary absolute right-0 w-[240px] shadow-xl rounded-[10px] p-[20px] z-[9999]">
        <div class="flex flex-row items-center bg-secondary-light p-[5px] rounded-[10px]">
            <PersonIcon class="[&>*]:fill-secondary-wrapper-dark [&>*]:w-[20px] [&>*]:h-[24px]"/>
            <div>
                <p class="font-bold">{{ userInfo.userProfile.value.username.substring(0, 10) + (userInfo.userProfile.value.username.length < 10 ? "" : "...") }}</p>
                <p class="text-secondary-wrapper-light">{{ userInfo.userProfile.value.email.substring(0, 10) + (userInfo.userProfile.value.email.length < 10 ? "" : "...") }}</p>
            </div>
        </div>

        <ul class="my-[10px]">
            <li class="flex flex-row items-center hover:[&>*]:fill-primary-primary" v-for="item in props.menuItems">
                <NuxtLink 
                :class="'flex flex-row items-center transition-all transition-250 hover:[&>*]:fill-primary-primary hover:[&>*]:text-primary-primary ' + ''" 
                :to="item.route">
                    <component class="mr-[5px] w-[20px] h-[20px]" :is="item.icon"></component>
                    <p :class="'font-medium transition-all transition-250 ' + (item.color ? 'text-' + item.color + '' : '')">{{ item.label }}</p>
                </NuxtLink>
            </li>

            <li class="flex flex-row items-center hover:[&>*]:fill-primary-primary">
                <NuxtLink 
                class="flex flex-row items-center transition-all transition-250 hover:[&>*]:fill-primary-primary hover:[&>*]:text-primary-primary tomato-secondary tomato-primary" 
                @click="useClearSession()"
                to="/">
                    <DoorIcon class="mr-[5px] w-[20px] h-[20px]" />
                    <p class="font-medium transition-all transition-250">{{ $t("usermenu.logout") }}</p>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>