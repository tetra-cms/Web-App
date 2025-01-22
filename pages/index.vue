<script setup lang="ts">
import ContactHeader from '~/components/contactheader/ContactHeader.vue';
</script>

<template>
  <DesktopOnly>
    <ContactHeader></ContactHeader>
  </DesktopOnly>

  <MobileOnly>
    <p>Mobile представление</p>
  </MobileOnly>
</template>
