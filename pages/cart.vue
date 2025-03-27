<script lang="ts" setup>
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';
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
    </DesktopOnly>
    
    <div>
        <p class="text-center">WORK IN PROGRESS</p>
    </div>
</template>