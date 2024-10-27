<script setup lang="ts">
const deviceType = inject("deviceType");
</script>

<template>
    <slot v-if="deviceType == UserDeviceTypes.Desktop"/>
</template>