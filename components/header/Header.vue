<script setup lang="ts">
import LogoIcon from '~/assets/svg/logo.svg';
import CartIcon from '~/assets/svg/cart.svg';
import PersonIcon from '~/assets/svg/person.svg';
import { MenuItems } from "~/content/header/HeaderData"
import RoundedButton from '../roundedbutton/RoundedButton.vue';

const props = defineProps<{
    title: String,
    subtitle: String
}>();
</script>

<template>
    <div class="flex justify-between px-[25px] py-[25px]">
        <NuxtLink to="/">
            <div class="flex flex-row mr-[20px]">
                <div class="px-[10px]">
                    <LogoIcon/>
                </div>
                    
                <div class="flex flex-col mr-[10px]">
                    <p class="text-primary-primary font-bold uppercase">{{ props.title }}</p>
                    <p class="text-secondary-wrapper-dark font-bold uppercase text-nowrap">{{ props.subtitle }}</p>
                </div>
            </div>
        </NuxtLink>
        

        <nav class="w-full flex-row items-center px-[25px]">
            <ul class="flex flex-row py-[15px] justify-between">
                <li v-for="item in MenuItems">
                    <NuxtLink :to="item.route" class="hover:text-primary-primary font-medium">{{ item.label }}</NuxtLink>
                </li>
            </ul>
        </nav>

        <div class="flex flex-row items-center justify-between">
            <RoundedButton :icon="CartIcon"/>
            <RoundedButton :icon="PersonIcon"/>
        </div>
    </div>
</template>