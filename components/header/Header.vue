<script setup lang="ts">
import LogoIcon from '~/assets/svg/logo.svg';
import type IMenuItem from "~/types/MenuItem";
import { MenuItems } from "~/content/header/HeaderData"

const props = defineProps<{
    title: String,
    subtitle: String
}>();
</script>

<template>
    <div class="flex justify-between px-[25px] py-[25px]">
        <div class="flex flex-row">
            <div>
                <LogoIcon/>
            </div>
            
            <div class="flex flex-col mr-[10px]">
                <p class="text-primary-primary font-bold uppercase">{{ props.title }}</p>
                <p class="text-secondary-wrapper-dark font-bold uppercase">{{ props.subtitle }}</p>
            </div>
        </div>

        <nav>
            <ul>
                <li v-for="item in MenuItems"><NuxtLink>{{ item.label }}</NuxtLink></li>
            </ul>
        </nav>

        <div>

        </div>
    </div>
</template>