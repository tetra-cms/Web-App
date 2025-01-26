<script setup lang="ts">
const props = defineProps<{
    icon: string,
    splashAmount: {
        required: false,
        type: number
    },
    link: {
        required: false,
        type: string
    }
}>();
</script>

<template>
    <NuxtLink v-if="props.link" :to="String(props.link)">
        <div class="bg-primary-primary p-[10px] mx-[10px] rounded-full transition-all transition-250 hover:bg-primary-secondary">
            <component :is="props.icon"/>
        </div>
    </NuxtLink>

    <div 
        v-else
        class="bg-primary-primary p-[10px] mx-[10px] rounded-full transition-all transition-250 hover:bg-primary-secondary">
        <component :is="props.icon"/>
    </div>
</template>