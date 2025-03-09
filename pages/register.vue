<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';

import { RegisterFormFields } from '~/content/auth/RegisterFormFields';
import type { RegisterSubmitData, RegisterResponse } from '~/content/auth/RegisterFormFields';

useRedirectUnauthorized();

const errorMessage : Ref<string> = ref("");
async function registerUser(userData: RegisterSubmitData) {
    const response: RegisterResponse = await $fetch('/auth/register', {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'POST',
        body: userData,
        onResponse: function(event) {
            if (!event.response.ok
            || event.error) {
                errorMessage.value = event.response._data.message;
                return;
            }
        }
    });

    if (response.createdAt)
    {
        navigateTo("/auth");
    }
}
</script>

<template>
    <DesktopOnly>
        <ContactHeader
            :contact-general="String(ContactGeneral)" 
            :contact-list="ContactsList" 
            :current-city="String(CurrentCity)"/>
    </DesktopOnly>
    
    <Header 
        :title="String(CompanyData.title)"
        :subtitle="String(CompanyData.subtitle)"></Header>

    <div class="w-full h-[80%] flex justify-center flex-col items-center">
        <CustomForm 
            :title="$t('auth.title.register')"
            @submitinfo="registerUser"
            :fields="RegisterFormFields"
        />

        <p class="text-[red]">{{ $t(errorMessage) }}</p>
    </div>
</template>