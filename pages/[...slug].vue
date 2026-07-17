<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useContentApi } from "~/composables/api/useContentApi";
import {
    ContactGeneral,
    ContactsList,
    CurrentCity,
} from "~/content/contactheader/ContactHeaderData";
import { CompanyData } from "~/content/header/HeaderData";

import NotFoundIcon from "~/assets/svg/404.svg";

const { t } = useI18n();

const route = useRoute();
const contentApi = useContentApi();

const pageContent = ref("");
const succesfullLoad = ref(true);

try {
    const response = await contentApi.getByRoute(
        route.path
    );

    pageContent.value = response.content;
} catch {
    succesfullLoad.value = false;
}
</script>

<template>
    <div 
      class="w-full h-[100vh] flex flex-col gap-[20px] justify-center items-center"
      v-if="!succesfullLoad">
      <div class="text-center flex flex-col justify-center items-center">
        <NotFoundIcon
          class="w-[96px] h-[96px]"
        />

        <p>{{ t("404.sub_title") }}</p>
        <p>{{ t("404.title") }}</p>
      </div>
    
      <NuxtLink 
        class="flex flex-row items-center justify-center select-none text-secondary-primary font-semibold p-[5px] rounded-[5px] bg-primary-primary"
        to="/">
        {{ t("404.comeback") }}
      </NuxtLink>
    </div>

  <template 
    v-else>
    <DesktopOnly>
        <ContactHeader
            :contact-general="String(ContactGeneral)"
            :contact-list="ContactsList"
            :current-city="String(CurrentCity)"
        />

        <Header
            :title="String(CompanyData.title)"
            :subtitle="String(CompanyData.subtitle)"
        />
    </DesktopOnly>

    

    <div class="w-full flex justify-center">
        <div
            class="flex flex-col max-w-[1200px]"
            v-html="pageContent"
        />
    </div>
  </template>
</template>