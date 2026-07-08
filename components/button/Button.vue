<script lang="ts" setup>
const props = defineProps<{
    label: string,
    attributes?: string
}>();
</script>

<template>
    <button 
        :class="'flex flex-row items-center text-center justify-center select-none text-secondary-primary font-semibold p-[5px] rounded-[5px] bg-primary-primary ' + props.attributes">
            <p class="text-[10pt]">{{ props.label }}</p>
    </button>
</template>