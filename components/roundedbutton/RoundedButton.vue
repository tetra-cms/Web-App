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
    <NuxtLink v-if="props.link" class="relative" :to="String(props.link)">
        <div class="bg-primary-primary p-[10px] mx-[10px] rounded-full transition-all transition-250 hover:bg-primary-secondary">
            <component :is="props.icon"/>
        </div>
        <p v-if="props.splashAmount" class="bg-primary-secondary text-secondary-primary rounded-full font-bold text-xs p-[2px] absolute bottom-0 right-[5px]">
            {{ props.splashAmount }}
        </p>
    </NuxtLink>

    <div 
        v-else
        class="bg-primary-primary p-[10px] mx-[10px] rounded-full transition-all transition-250 hover:bg-primary-secondary">
        <component class="[&>*]:fill-bg-secondary-primary w-[20px] h-[20px]" :is="props.icon"/>
    </div>
</template>