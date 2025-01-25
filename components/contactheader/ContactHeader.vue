<script setup lang="ts">
import GPSIcon from '~/assets/svg/gps.svg';
import PhoneIcon from '~/assets/svg/phone.svg';
import ContactData from '~/types/ContactData';

const props = defineProps({
    currentCity: String,
    contactGeneral: String,
    contactList: {
        required: false,
        type: Array<ContactData>
    } 
});
</script>

<template>
    <div class="flex h-[45px] bg-secondary-light">
        <div class="flex w-full justify-between flex-row items-center mx-[20px]">
            <div class="flex flex-row">
                <GPSIcon/>
                <p class="text-bold">{{ props.currentCity }}</p>
            </div>

            <div class="flex flex-col">
                <a class="text-secondary-wrapper-light underline">Обратный звонок</a>
                <a :href="'mailto:' + props.contactGeneral">{{ props.contactGeneral }}</a>
            </div>

            <div>
                <ul class="flex flex-col">
                    <li class="flex flex-row items-center" v-for="contact in props.contactList">
                        <PhoneIcon/>
                        <a :href="'tel:' + contact.contact">{{ contact.contact }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>