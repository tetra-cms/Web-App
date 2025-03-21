<script setup lang="ts">
import PersonIcon from '~/assets/svg/person.svg';
import type IUserMenuItem from '~/types/usermenu/UserMenuItem';

import DoorIcon from '~/assets/svg/door.svg';

const props = defineProps<{
    nickname: string,
    email: string,
    menuItems: Array<IUserMenuItem>
}>();

function clearSession()
{
    const accessToken = useCookie("access_token");
    accessToken.value = null;
    navigateTo("/");

    location.reload();
}
</script>

<template>
    <div class="bg-secondary-primary absolute right-0 w-[240px] shadow-xl rounded-[10px] p-[20px] z-[9999]">
        <div class="flex flex-row items-center bg-secondary-light p-[5px] rounded-[10px]">
            <PersonIcon class="[&>*]:fill-secondary-wrapper-dark [&>*]:w-[20px] [&>*]:h-[24px]"/>
            <div>
                <p class="font-bold">{{ props.nickname }}</p>
                <p class="text-secondary-wrapper-light">{{ props.email }}</p>
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
                @click="clearSession"
                to="/">
                    <DoorIcon class="mr-[5px] w-[20px] h-[20px]" />
                    <p class="font-medium transition-all transition-250">{{ $t("usermenu.logout") }}</p>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>