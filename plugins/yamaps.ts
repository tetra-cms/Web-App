import { defineNuxtPlugin } from '#app';
import { createYmaps } from 'vue-yandex-maps';
 
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(createYmaps({
        apikey: String(nuxtApp.$config.public.yaApiKey)
    }))
});