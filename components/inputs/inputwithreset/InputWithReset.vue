<script setup lang="ts">
const props = defineProps<{
    placeholder: string
}>();


</script>

<template>
    <div>
        <div>

        </div>

        <input 
            class="py-[10px] pr-[30px] bg-secondary-light border-none rounded-r-xl"
            :placeholder="props.placeholder">
    </div>
</template>