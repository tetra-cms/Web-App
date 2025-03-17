<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';

import { AuthFormFields } from '~/content/auth/AuthFormFields';
import type { AuthSubmitData, AuthResponse } from '~/content/auth/AuthFormFields';

const errorMessage : Ref<string> = ref("");
async function authUser(userData: AuthSubmitData) {
    const response: AuthResponse = await $fetch('/auth/login', {
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

    if (response.access_token)
    {
        const accessToken = useCookie("access_token");
        accessToken.value = response.access_token;
        navigateTo("/");
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
            :title="$t('auth.title.login')"
            @submitinfo="authUser"
            :fields="AuthFormFields"
        />

        <p class="text-[red]">{{ $t(errorMessage) }}</p>
    </div>
</template>