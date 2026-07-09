<script setup lang="ts">
import { ref } from "vue";
import { navigateTo } from "#app";

import {
    AuthFormFields,
    type AuthSubmitData,
    type AuthResponse,
} from "~/content/auth/AuthFormFields";

import { useApi } from "~/composables/useApi";
import { useUserStore } from "~/stores/user";
import { CompanyData } from "~/content/header/HeaderData";
import { ContactGeneral, ContactsList, CurrentCity } from "~/content/contactheader/ContactHeaderData";

const api = useApi();
const userStore = useUserStore();

const errorMessage = ref("");
const loading = ref(false);

const authUser = async (userData: AuthSubmitData) => {
    errorMessage.value = "";
    loading.value = true;

    try {
        const response = await api<AuthResponse>("/auth/login", {
            method: "POST",
            body: userData,
        });

        await userStore.login(response);

        await navigateTo("/");
    } catch (error: any) {
        errorMessage.value =
            error?.data?.error ??
            error?.data?.message ??
            "errors.auth.invalidCredentials";
    } finally {
        loading.value = false;
    }
};
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