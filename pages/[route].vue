<script setup lang="ts">
import { useContentApi } from "~/composables/api/useContentApi";
import {
    ContactGeneral,
    ContactsList,
    CurrentCity,
} from "~/content/contactheader/ContactHeaderData";
import { CompanyData } from "~/content/header/HeaderData";

const route = useRoute();
const contentApi = useContentApi();

const pageContent = ref("");

try {
    const response = await contentApi.getByRoute(
        route.path
    );

    pageContent.value = response.content;
} catch {
    pageContent.value = "";
}
</script>

<template>
    <DesktopOnly>
        <ContactHeader
            :contact-general="String(ContactGeneral)"
            :contact-list="ContactsList"
            :current-city="String(CurrentCity)"
        />
    </DesktopOnly>

    <Header
        :title="String(CompanyData.title)"
        :subtitle="String(CompanyData.subtitle)"
    />

    <div class="w-full flex justify-center">
        <div
            class="flex flex-col max-w-[1200px]"
            v-html="pageContent"
        />
    </div>
</template>