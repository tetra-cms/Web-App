<script setup lang="ts">
import { FieldType } from '~/types/form/FormField';
import type IFormElement from '~/types/form/FormField';

const props = defineProps<{
    title: string,
    fields: Array<IFormElement>
}>();

function getFieldType(type: FieldType)
{
    switch(type) {
        case FieldType.InputPassword: return "password";
        case FieldType.InputEmail: return "email";    

        default: return "text"; 
    }
}

const emit = defineEmits(['submitinfo']);
function onSubmit(event: SubmitEvent)
{
    emit("submitinfo", Object.fromEntries(new FormData(event.target as HTMLFormElement)));
}

const deviceType = inject('deviceType');
</script>

<template>
    <form
        class="rounded-[10px] p-[40px] w-full max-w-[400px]"
        :class="deviceType == UserDeviceTypes.Desktop ? 'border-secondary-wrapper-light border-[1px]' : ''"
        @submit.prevent="onSubmit">

        <h2 class="text-[24px] text-center font-bold mb-[40px]">{{ title }}</h2>

        <ul>
            <li class="my-[20px]" v-for="field in props.fields">
                <input
                    v-if="field.type != FieldType.Button 
                    && field.type != FieldType.Link"
                    :name="field.name"
                    class="w-full px-[10px] py-[5px] border-secondary-wrapper-light border-[1px] rounded-[5px]"
                    :type="getFieldType(field.type)" 
                    :placeholder="field.placeholder">

                <button 
                    v-if="field.type == FieldType.Button"

                    class="w-full py-[10px] font-bold text-[12px] bg-primary-primary hover:bg-primary-secondary transition-all duration-300 rounded-[5px] text-secondary-primary">
                    {{ field.placeholder }}
                </button>

                <RouterLink
                    v-if="field.type == FieldType.Link"
                    :to="String(field.route)">
                    <p class="text-center">{{ field.placeholder }}</p>
                </RouterLink>
            </li>
        </ul>

    </form>
</template>