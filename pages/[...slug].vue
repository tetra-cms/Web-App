<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useContentApi } from "~/composables/api/useContentApi";
import {
    ContactGeneral,
    ContactsList,
    CurrentCity,
} from "~/content/contactheader/ContactHeaderData";
import { CompanyData } from "~/content/header/HeaderData";
import ErrorGeoIcon from "~/assets/svg/errorgeo.svg";

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
        <ErrorGeoIcon class="w-[148px] [&>*]:fill-primary-primary"/>

        <p class="text-[32px] font-bold">404</p>
        <p class="text-[20px] font-bold">{{ t("404.sub_title") }}</p>
        <RouterLink 
          class="text-[16px]" 
          to="/">
          {{ t("404.comeback") }}
        </RouterLink>
      </div>
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