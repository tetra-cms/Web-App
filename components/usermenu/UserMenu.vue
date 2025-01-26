<script setup lang="ts">
import PersonIcon from '~/assets/svg/person.svg';
import type IUserMenuItem from '~/types/usermenu/UserMenuItem';

const props = defineProps<{
    nickname: string,
    email: string,
    menuItems: Array<IUserMenuItem>
}>();
</script>

<template>
    <div>
        <div class="flex flex-row  items-center bg-secondary-light p-[10px]">
            <PersonIcon class="[&>*]:fill-secondary-wrapper-dark w-[32px]"/>
            <div>
                <p class="font-bold">{{ props.nickname }}</p>
                <p class="text-secondary-wrapper-light">{{ props.email }}</p>
            </div>
        </div>

        <ul>
            <li v-for="item in props.menuItems">
                <component :is="item.icon"></component>
                <NuxtLink>{{ item.label }}</NuxtLink>
            </li>
        </ul>
    </div>
    
</template>