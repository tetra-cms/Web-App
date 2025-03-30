<script lang="ts" setup>
const props = defineProps<{
    amount: number,
    summary: number
}>();
</script>

<template>
    <div class="w-full flex flex-row justify-center fixed bottom-[60px] bg-secondary-secondary">
        <button 
            class="flex text-[10pt] flex-row items-center text-center justify-between select-none text-secondary-primary font-semibold p-[5px] rounded-[5px] bg-primary-primary w-full">
                <p class="font-normal">
                    {{ props.amount }} 
                    {{ pluralizeWord($t("labels.item.singular"), $t("labels.item.plural"), props.amount) }}
                </p>
                <p>{{ $t("buttons.placeorder") }}</p>
                <p class="font-normal">{{ props.summary.toLocaleString() }} ₽</p>
        </button>
    </div>
</template>