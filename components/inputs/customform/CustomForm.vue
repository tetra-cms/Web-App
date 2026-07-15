<script setup lang="ts">
import { FieldType } from '~/types/form/FormField';
import type IFormElement from '~/types/form/FormField';

const props = defineProps<{
    title?: string,
    subtitle?: string,
    textLabels?: boolean,
    fields: Array<IFormElement>
}>();

function getFieldType(type: FieldType)
{
    switch(type) {
        case FieldType.Hidden: return "hidden";
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
        :class="$attrs.class ?? 'rounded-[10px] p-[40px] w-full max-w-[400px] ' + (deviceType == UserDeviceTypes.Desktop ? 'border-secondary-wrapper-light border-[1px]' : '')"
        @submit.prevent="onSubmit">

        <h2 v-if="props.title" class="text-[24px] text-center font-bold mb-[10px]">{{ title }}</h2>
        <p class="text-center" v-if="subtitle">{{ subtitle }}</p>

        <ul>
            <li class="my-[20px]" v-for="field in props.fields">
                <label v-if="props.textLabels 
                && field.type !== FieldType.Button
                && field.type !== FieldType.Hidden">
                    {{ field.placeholder }}
                </label>


                <textarea 
                    v-if="field.type == FieldType.TextArea"
                    class="w-full px-[10px] py-[5px] border-secondary-wrapper-light border-[1px] rounded-[5px]"
                    :name="field.name"
                    :placeholder="!props.textLabels ? field.placeholder : ''"
                    :value="field.default ?? ''">
                </textarea>

                <input
                    v-if="field.type == FieldType.Input 
                    || field.type == FieldType.InputEmail 
                    || field.type == FieldType.InputPassword
                    || field.type == FieldType.Hidden"
                    :name="field.name"
                    class="w-full px-[10px] py-[5px] border-secondary-wrapper-light border-[1px] rounded-[5px]"
                    :type="getFieldType(field.type)" 
                    :placeholder="!props.textLabels ? field.placeholder : ''"
                    :value="field.default ?? ''">

                <label
                  v-if="field.type == FieldType.Checkbox"
                  class="flex items-start gap-2 cursor-pointer">

                  <input
                      type="checkbox"
                      :name="field.name"
                      :checked="field.checked ?? false"
                      class="mt-1">

                  <span>
                      <slot
                          :name="field.name + '-label'"
                          :field="field">
                          {{ field.placeholder }}
                      </slot>
                  </span>
              </label>

                <select 
                    class="w-full px-[10px] py-[5px] border-secondary-wrapper-light border-[1px] rounded-[5px]"
                    v-if="field.type == FieldType.List"
                    :id="field.name"
                    :name="field.name">
                    <option :value="item.value" v-for="item in field.listItems" :selected="item.value == field.default">
                        {{ item.label }}
                    </option>
                </select>

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