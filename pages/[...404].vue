<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import NotFoundIcon from '~/assets/svg/404.svg';

const { t } = useI18n();
</script>

<template>
  <div class="w-full h-[100vh] flex flex-col gap-[20px] justify-center items-center">
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
</template>