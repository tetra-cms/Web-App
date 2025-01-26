<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';
import ContactHeader from '~/components/contactheader/ContactHeader.vue';
</script>

<template>
  <DesktopOnly>
    <ContactHeader 
        :contact-general="String(ContactGeneral)" 
        :contact-list="ContactsList" 
        :current-city="String(CurrentCity)"/>
    
    <Header 
        :title="String(CompanyData.title)"
        :subtitle="String(CompanyData.subtitle)"></Header>

    <div class="flex flex-row justify-between px-[60px]">
        <h1 class="font text-[32px] font-bold">Наша продукция</h1>
        <div></div>
    </div>
  </DesktopOnly>

  <MobileOnly>
    <p>Mobile представление</p>
  </MobileOnly>
</template>
