<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from '~/modules/contactheader/ContactHeaderData';
import ContactHeader from '~/components/contactheader/ContactHeader.vue';
</script>

<template>
  <DesktopOnly>
    <ContactHeader 
        :contactgeneral="String(ContactGeneral)" 
        :contactlist="ContactsList" 
        :current-city="String(CurrentCity)"/>
  </DesktopOnly>

  <MobileOnly>
    <p>Mobile представление</p>
  </MobileOnly>
</template>
