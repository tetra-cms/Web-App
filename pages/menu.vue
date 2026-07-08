<script lang="ts" setup>
import { UserMenuItems } from '~/content/usermenu/UserMenuItems';

import AccountIcon from '~/assets/svg/account.svg';
import DoorIcon from '~/assets/svg/door.svg';
</script>

<template>
    <MobileOnly>
        <div 
            class="h-full flex flex-col justify-center p-[20px]"
            v-if="!useCheckUserAuth()">
            <div class="w-full flex justify-center">
                <AccountIcon class="[&>*]:fill-primary-primary w-[128px] mb-[20px]" />
            </div>

            <p 
                class="font-medium mb-[20px] text-center">
                {{ $t("auth.mobile.message") }}
            </p>

            <RouterLink 
                to="/auth">
                <p class="w-full py-[10px] text-center font-bold text-[12px] bg-primary-primary hover:bg-primary-secondary transition-all duration-300 rounded-[5px] text-secondary-primary">
                    {{ $t("auth.buttons.login") }}
                </p>
            </RouterLink>
        </div>

        <div v-else>
            <div 
            class="bg-secondary-secondary">
                <ProfileInfo/>
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

                <li 
                @click="useClearSession()"
                class="flex flex-row mx-[10px] border-secondary-wrapper-light border-b-[1px] py-[15px] items-center hover:[&>*]:fill-primary-primary">
                    <NuxtLink 
                    class="flex flex-row items-center transition-all transition-250 hover:[&>*]:fill-tomato-primary hover:[&>*]:text-primary-primary">
                        <DoorIcon class="mr-[10px] w-[22px] h-[22px]" />
                        <p class="text-tomato-primary font-bold transition-all transition-250">{{ $t("usermenu.logout") }}</p>
                    </NuxtLink>
                </li>
            </ul>
        </div>
        
    </MobileOnly>
</template>