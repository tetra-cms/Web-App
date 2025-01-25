<script setup lang="ts">
const props = defineProps<{
    icon: string
}>();
</script>

<template>
    <div class="bg-primary-primary p-[10px] mx-[10px] rounded-full">
        <component :is="props.icon"/>
    </div>
</template>