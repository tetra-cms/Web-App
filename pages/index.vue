<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import ContactHeader from '~/components/contactheader/ContactHeader.vue';
</script>

<template>
  <DesktopOnly>
    <ContactHeader 
        :contact-general="String(ContactGeneral)" 
        :contact-list="ContactsList" 
        :current-city="String(CurrentCity)"/>
  </DesktopOnly>

  <MobileOnly>
    <p>Mobile представление</p>
  </MobileOnly>
</template>
