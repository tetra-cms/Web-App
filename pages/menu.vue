<script lang="ts" setup>
import { UserMenuItems } from '~/content/usermenu/UserMenuItems';
</script>

<template>
    <MobileOnly>
        <div 
            class="p-[20px] bg-secondary-secondary"
            v-if="!useCheckUserAuth()">
            <RouterLink 
                to="/auth">
                <p class="w-full py-[10px] text-center font-bold text-[12px] bg-primary-primary hover:bg-primary-secondary transition-all duration-300 rounded-[5px] text-secondary-primary">
                    {{ $t("auth.buttons.login") }}
                </p>
            </RouterLink>
        </div>

        <div 
            class="bg-secondary-secondary" 
            v-else>
            
        </div>

        <ul v-if="useCheckUserAuth()">
            <li class="flex flex-row mx-[10px] border-secondary-wrapper-light border-b-[1px] py-[15px] items-center hover:[&>*]:fill-primary-primary" v-for="item in UserMenuItems">
                <NuxtLink 
                :class="'flex flex-row items-center transition-all transition-250 hover:[&>*]:fill-primary-primary hover:[&>*]:text-primary-primary ' + ''" 
                :to="item.route">
                    <component class="mr-[10px] w-[22px] h-[22px]" :is="item.icon"></component>
                    <p :class="'font-bold transition-all transition-250 ' + (item.color ? 'text-' + item.color + '' : '')">{{ item.label }}</p>
                </NuxtLink>
            </li>
        </ul>
    </MobileOnly>
</template>