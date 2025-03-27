<script lang="ts" setup>
import { useUserStore } from '~/store/user';
import PersonIcon from '~/assets/svg/person.svg';

const userStore = useUserStore();
if (!userStore.$state.userProfile)
{
    await userStore.storeUserInfo(String(useCookie("access_token").value));
}
const userInfo = storeToRefs(userStore);
</script>

<template>
    <div class="flex flex-row items-center px-[10px] py-[10px]">
        <PersonIcon class="[&>*]:fill-secondary-wrapper-dark [&>*]:w-[20px] [&>*]:h-[24px] mr-[10px]"/>

        <div class="flex flex-col">
            <p class="font-bold">{{ userInfo.userProfile.value.username.substring(0, 10) + (userInfo.userProfile.value.username.length < 10 ? "" : "...") }}</p>
            <p>{{ userInfo.userProfile.value.email.substring(0, 10) + (userInfo.userProfile.value.email.length < 10 ? "" : "...") }}</p>
        </div>
    </div>
</template>