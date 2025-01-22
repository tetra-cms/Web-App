<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from '~/modules/contactheader/ContactHeaderData';
import GPSIcon from '~/assets/svg/gps.svg';
import PhoneIcon from '~/assets/svg/phone.svg';
</script>

<template>
    <div class="flex h-[45px] bg-secondary-light">
        <div class="flex w-full justify-between flex-row items-center mx-[20px]">
            <div class="flex flex-row">
                <GPSIcon/>
                <p class="text-bold">{{ CurrentCity }}</p>
            </div>

            <div class="flex flex-col">
                <a class="text-secondary-wrapper-light underline">Обратный звонок</a>
                <a :href="'mailto:' + ContactGeneral">{{ ContactGeneral }}</a>
            </div>

            <div>
                <ul class="flex flex-col">
                    <li class="flex flex-row items-center" v-for="contact in ContactsList">
                        <PhoneIcon/>
                        {{ contact.contact }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>