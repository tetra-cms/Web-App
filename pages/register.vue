<script setup lang="ts">
import { ref } from "vue";
import { navigateTo } from "#app";

import {
    RegisterFormFields,
    type RegisterSubmitData,
    type RegisterResponse,
} from "~/content/auth/RegisterFormFields";

import { ContactGeneral, ContactsList, CurrentCity } from "~/content/contactheader/ContactHeaderData";
import { CompanyData } from "~/content/header/HeaderData";

import { useApi } from "~/composables/useApi";

const api = useApi();

const errorMessage = ref("");
const loading = ref(false);

const registerUser = async (userData: RegisterSubmitData) => {
    errorMessage.value = "";

    if (userData.password !== userData.repeatpassword) {
        errorMessage.value = "errors.auth.mismatchpass";
        return;
    }

    loading.value = true;

    try {
        await api<RegisterResponse>("/auth/register", {
            method: "POST",
            body: {
                username: userData.username,
                email: userData.email,
                password: userData.password,
            },
        });

        await navigateTo("/auth");
    } catch (error: any) {
        errorMessage.value =
            error?.data?.error ??
            error?.data?.message ??
            "errors.auth.registerFailed";
    } finally {
        loading.value = false;
    }
};

import UserIcon from "~/assets/svg/user.svg?skipsvgo";
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
        <DesktopOnly>
          <CustomForm 
              :icon="UserIcon"
              :title="$t('auth.title.register')"
              @submitinfo="registerUser"
              :fields="RegisterFormFields">
              <template #terms-label>
                <p class="text-sm">Я принимаю 
                  <RouterLink
                      to="/terms"
                      class="text-primary-primary">
                      условиями использования
                  </RouterLink>
                </p>
              </template>
              <template #privacy-label>
                <p class="text-sm">Я выражаю своё согласие с
                  <RouterLink
                      to="/privacy"
                      class="text-primary-primary">
                    согласием на обработку персональных данных
                  </RouterLink>
                </p>
              </template>
          </CustomForm>
        </DesktopOnly>

        <MobileOnly>
          <CustomForm 
              :title="$t('auth.title.register')"
              @submitinfo="registerUser"
              :fields="RegisterFormFields">
              <template #terms-label>
                <p class="text-sm">Я принимаю 
                  <RouterLink
                      to="/terms"
                      class="text-primary-primary">
                      условиями использования
                  </RouterLink>
                </p>
              </template>
              <template #privacy-label>
                <p class="text-sm">Я выражаю своё согласие с
                  <RouterLink
                      to="/privacy"
                      class="text-primary-primary">
                    согласием на обработку персональных данных
                  </RouterLink>
                </p>
              </template>
          </CustomForm>
        </MobileOnly>
        

        <p class="text-[red]">{{ $t(errorMessage) }}</p>
    </div>
</template>