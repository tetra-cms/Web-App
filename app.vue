<script setup lang="ts">
import { Desktop, Mobile } from "#components";
import { HeadData } from "./content/head/HeadData";

const nuxt = useNuxtApp();
function getDeviceInfo() {
    let userAgent = nuxt.ssrContext?.event.headers.get("User-Agent") ?? navigator.userAgent ?? "";
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
        return UserDeviceTypes.Mobile;
    } else {
        return UserDeviceTypes.Desktop;
    }
}

provide("deviceType", getDeviceInfo());

useHead({
    title: HeadData.title,
    meta: [
        { name: 'description', content: HeadData.description },
        { name: 'og:image', content: "/favicon.ico" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
        { name: 'mobile-web-app-capable', content: 'yes' }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
});
</script>

<template>
    <NuxtPwaManifest/>

    <div v-if="getDeviceInfo() == UserDeviceTypes.Desktop">
        <Desktop/>
    </div>

    <div v-else>
        <Mobile/>
    </div>
</template>
