<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';

import { RegisterFormFields } from '~/content/auth/RegisterFormFields';
</script>

<template>
    <ContactHeader 
        :contact-general="String(ContactGeneral)" 
        :contact-list="ContactsList" 
        :current-city="String(CurrentCity)"/>
    
    <Header 
        :title="String(CompanyData.title)"
        :subtitle="String(CompanyData.subtitle)"></Header>

    <div class="w-full flex justify-center items-center">
        <CustomForm 
            :title="$t('auth.title.register')"
            :fields="RegisterFormFields"
        />
    </div>
</template>