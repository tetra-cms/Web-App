<script setup lang="ts">
const props = defineProps<{
    placeholder: string
    icon?: string
}>();

const inputValue = ref("");

function clearInput()
{
    inputValue.value = "";
}
</script>

<template>
    <div class="flex flex-row">
        <div v-if="props.icon" 
        class="w-[32px] h-full flex flex-row justify-center bg-secondary-light rounded-l-xl outline-none">
            <component class="w-[24px]" :is="props.icon"></component>
        </div>

        <input 
            :class="'py-[10px] bg-secondary-light border-none ' + (props.icon ? 'rounded-r-xl pr-[30px]' : 'rounded-xl px-[10px]')"
            v-model="inputValue"
            :placeholder="props.placeholder">

        <button 
            class="h-full flex flex-column items-center p-[5px] text-primary-primary"
            @click="clearInput"
            v-if="inputValue.length > 0">

            Отмена

        </button>
    </div>
</template>