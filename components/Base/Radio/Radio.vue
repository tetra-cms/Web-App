<script setup lang="ts">
defineProps<{
  modelValue: string | number | boolean
  value: string | number | boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
}>()
</script>

<template>
  <label class="group inline-flex items-center gap-3 cursor-pointer">
    <input
      type="radio"
      class="sr-only"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
    />

    <div class="w-8 h-8 rounded-full bg-secondary-wrapper-light flex items-center justify-center">
      <div
        class="w-5 h-5 rounded-full bg-primary-primary
              transition-transform scale-0
              group-has-[:checked]:scale-100">
      </div>
    </div>

    <div class="group-has-[:checked]:[&_*]:fill-primary-primary group-has-[:checked]:text-primary-primary">
      <slot />
    </div>
    
  </label>
</template>