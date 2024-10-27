<script setup lang="ts">
import { Desktop, Mobile } from "#components";

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
</script>

<template>
  <div v-if="getDeviceInfo() == UserDeviceTypes.Desktop">
      <Desktop/>
  </div>

  <div v-else>
      <Mobile/>
  </div>
</template>
