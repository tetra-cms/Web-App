<script lang="ts" setup>
import CartIcon from "~/assets/svg/cart.svg";

const props = defineProps<{
    id: number,
    price?: number,
    attributes?: string
}>();
</script>

<template>
    <button 
        @click="$emit('addCartItem', { id: props.id })" 
        :class="'flex flex-row items-center text-center justify-center select-none text-secondary-primary font-semibold p-[5px] rounded-[5px] bg-primary-primary ' + props.attributes">
        
            <CartIcon class="w-[20px] h-[20px] mr-[5px] [&>*]:fill-secondary-primary"/>
            <p v-if="!price" class="text-[10pt]">{{ $t("buttons.incart") }}</p>
            <p v-else class="text-[10pt]">{{ props.price }} ₽</p>

    </button>
</template>