<script lang="ts" setup>
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';

import type { ApiContentPageResponse } from '~/types/api/ApiContentPageResponse';

const route = useRoute();
const response: ApiContentPageResponse  = await $fetch('/content', {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'POST',
    body: {
        route: route.path
    }
});

const pageContent: Ref<string> = ref(response.content);
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

    <div class="w-full flex justify-center">
        <div class="flex flex-col max-w-[1200px]" v-html="pageContent">
        </div>
    </div>
</template>