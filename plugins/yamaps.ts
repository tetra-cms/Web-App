import { defineNuxtPlugin } from '#app';
import { createYmaps } from 'vue-yandex-maps';

export default defineNuxtPlugin((nuxtApp) => {
    const apiKey = nuxtApp.$config.public.yaApiKey;

    if (!apiKey) {
        return;
    }

    nuxtApp.vueApp.use(
        createYmaps({
            apikey: apiKey,
        }),
    );
});