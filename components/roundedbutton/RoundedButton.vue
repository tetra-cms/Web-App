<script setup lang="ts">
const props = defineProps<{
    icon: string,
    link: string
}>();
</script>

<template>
    <NuxtLink to="">
        <div class="bg-primary-primary p-[10px] mx-[10px] rounded-full transition-all transition-250 hover:bg-primary-secondary">
            <component :is="props.icon"/>
        </div>
    </NuxtLink>
    
</template>