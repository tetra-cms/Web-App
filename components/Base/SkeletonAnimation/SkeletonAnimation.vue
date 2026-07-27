<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    rounded?: string;
  }>(),
  {
    width: "w-full",
    height: "h-4",
    rounded: "rounded-md",
  }
);
</script>

<template>
  <div
    :class="[
      props.width,
      props.height,
      props.rounded,
      'bg-gray-200 animate-pulse'
    ]"
  />
</template>