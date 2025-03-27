<script setup lang="ts">
import LogoIcon from '~/assets/svg/logo.svg';
import CartIcon from '~/assets/svg/cart.svg?skipsvgo';
import PersonIcon from '~/assets/svg/person.svg';
import { MenuItems } from "~/content/header/HeaderData"
import RoundedButton from '../roundedbutton/RoundedButton.vue';
import { UserMenuItems } from '~/content/usermenu/UserMenuItems';

const props = defineProps<{
    title: String,
    subtitle: String
}>();

const accessToken = useCookie('access_token');

const userMenuShow = ref(false);
function userClick()
{
    if (accessToken.value)
    {
        userMenuShow.value = !userMenuShow.value;
    } else {
        navigateTo("/auth");
    }
    
}

const userMenu = useTemplateRef("user-menu");
useDetectOutsideClick(userMenu, () => {
    if (userMenuShow.value)
    {
        userMenuShow.value = !userMenuShow.value;   
    }
})
</script>

<template>
    <DesktopOnly>
        <div class="flex justify-between items-center px-[25px] py-[25px]">
            <NuxtLink to="/">
                <div class="flex flex-row">
                    <div class="px-[10px]">
                        <LogoIcon/>
                    </div>
                        
                    <div class="flex flex-col mr-[10px] max-md:hidden">
                        <p class="text-primary-primary font-bold uppercase">{{ props.title }}</p>
                        <p class="text-secondary-wrapper-dark font-bold uppercase text-nowrap">{{ props.subtitle }}</p>
                    </div>
                </div>
            </NuxtLink>
            

            <nav class="w-full flex-row items-center px-[25px]">
                <ul class="flex flex-row justify-start">
                    <li class="hover:text-primary-primary hover:border-b-4 transition-all mr-[50px] duration-100 ease-in border-primary-primary" 
                    v-for="item in MenuItems">
                        <NuxtLink :to="item.route" class="transition-all duration-100 font-medium">{{ item.label }}</NuxtLink>
                    </li>
                </ul>
            </nav>

            <div class="flex flex-row items-center justify-between h-full">
                <RoundedButton :icon="CartIcon" link="/cart"/>
                <div
                    ref="user-menu">
                    <RoundedButton :icon="PersonIcon" @click="userClick"/>

                    <UserMenu
                        v-if="userMenuShow"
                        :menu-items="UserMenuItems"/>
                </div>
            </div>
        </div>
    </DesktopOnly>
    
    <MobileOnly>
        <NuxtLink to="/">
            <div class="flex justify-center flex-row">
                <div class="px-[10px]">
                    <LogoIcon/>
                </div>
                        
                <div class="flex flex-col mr-[10px]">
                    <p class="text-primary-primary font-bold uppercase">{{ props.title }}</p>
                    <p class="text-secondary-wrapper-dark font-bold uppercase text-nowrap">{{ props.subtitle }}</p>
                </div>
            </div>
        </NuxtLink>
    </MobileOnly>
</template>