<script lang="ts" setup>
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';

import { ContactItem } from '~/content/contacts/ContactItem';

import ArrowUpRight from '~/assets/svg/arrow-up-right.svg';

import {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapListener,
} from 'vue-yandex-maps'

import type { YMap } from '@yandex/ymaps3-types';

const hasAutoRotate = ref(true);
const mapAzimuth = ref(0);
const mapTilt = ref((40 * Math.PI) / 180);
const frame = ref<null | number>(null);
const map = shallowRef<YMap | null>(null);

const startAutoRotationCamera = () => {
    if (!map.value) return;

    if (hasAutoRotate.value) {
        mapAzimuth.value = map.value.azimuth + ((10 * Math.PI) / 180 / 100);
        frame.value = requestAnimationFrame(startAutoRotationCamera);
    }
    else if (frame.value) cancelAnimationFrame(frame.value);
};

watch([hasAutoRotate, map], () => {
    if (typeof requestAnimationFrame === 'undefined') return;
    requestAnimationFrame(startAutoRotationCamera);
}, {
    immediate: true,
});

onBeforeUnmount(() => {
    if (frame.value) {
        hasAutoRotate.value = false;
        cancelAnimationFrame(frame.value);
    }
});
</script>

<style>
.ymaps3x0--map-container {
    border-radius: 40px;
}
</style>

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

    <div class="w-full flex lg:h-[70%] h-full items-center justify-center">
        <div class="flex lg:flex-row flex-col">
            <div>
                <h1
                    class="text-[48px] font-bold">
                    {{ $t("header.contacts") }}
                </h1>

                <div class="flex flex-col">
                    <a class="my-[10px]" :href="'tel:+' + ContactItem.phone?.replace(/[^0-9]/g, '')"><b>{{ ContactItem.phone }}</b></a>
                    <a class="my-[10px]" :href="'mailto:' + ContactItem.email"><b>{{ ContactItem.email }}</b></a>

                    <div class="flex flex-col mt-[20px]">
                        <p>{{ ContactItem.companyName }}</p>
                        <p>{{ $t("labels.itn") }}: {{ ContactItem.itn }}</p>
                        <p>{{ $t("labels.psnsp") }}: {{ ContactItem.psnsp }}</p>

                        <p class="mt-[30px]">{{ ContactItem.companyAddress }}</p>
                    </div>

                    <div class="mt-[30px]">
                        <RouterLink to="/">
                            <p
                            class="flex flex-row items-center text-center justify-center select-none text-secondary-primary font-semibold p-[5px] rounded-[5px] bg-primary-primary">
                                <p class="text-[10pt]">{{ $t("buttons.backincatalog") }}</p>
                            </p>
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="ml-[30px]">
                <ClientOnly>
                    <yandex-map
                        v-model="map"
                        height="100%"
                        :settings="{
                            location: {
                                center: [
                                    Number(ContactItem.coords?.lat), 
                                    Number(ContactItem.coords?.lon)
                                ],
                                zoom: 16,
                            },
                            camera: { azimuth: mapAzimuth, tilt: mapTilt, duration: hasAutoRotate ? 0 : 250 },
                            showScaleInCopyrights: false,
                            behaviors: [],
                        }"
                        width="600px">
                            <yandex-map-default-scheme-layer/>
                            <yandex-map-listener :settings="{ onActionStart: () => { return } }"/>
                    </yandex-map>
                </ClientOnly>
            </div>
        </div>
    </div>
</template>