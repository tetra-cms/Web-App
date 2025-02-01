<script setup lang="ts">
import GPSIcon from '~/assets/svg/gps.svg';
import PhoneIcon from '~/assets/svg/phone.svg';
import { formatPhoneNumber } from '~/helpers/phoneFormat';
import { IContactData } from '~/types/ContactData';
import { IFormatData } from '~/types/FormatData';

const props = defineProps({
    currentCity: String,
    contactGeneral: String,
    contactList: {
        required: false,
        type: Array<IContactData>
    } 
});

let filteredContacts : Array<IFormatData> = [];
props.contactList?.forEach((item) => {
    filteredContacts.push({
        rawText: item.contact,
        formatText: formatPhoneNumber(item.contact)
    });
});
</script>

<template>
    <div class="flex h-[45px] bg-secondary-light">
        <div class="flex w-full justify-between flex-row items-center mx-[20px]">
            <div class="flex flex-row">
                <GPSIcon class="w-[24px] h-[24px]"/>
                <p class="text-bold">{{ props.currentCity }}</p>
            </div>

            <div class="flex flex-col">
                <a class="text-secondary-wrapper-light underline">Обратный звонок</a>
                <a :href="'mailto:' + props.contactGeneral">{{ props.contactGeneral }}</a>
            </div>

            <div>
                <ul class="flex flex-col">
                    <li class="flex flex-row items-center" v-for="contact in filteredContacts">
                        <PhoneIcon class="w-[16px] h-[16px]"/>
                        <a :href="'tel:' + contact.rawText">{{ contact.formatText }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>