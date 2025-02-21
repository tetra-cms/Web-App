<script setup lang="ts">
import type { IProductCard } from '~/types/productcard/ProductCard';

import CartIcon from "~/assets/svg/cart.svg";

const props = defineProps<IProductCard>();
</script>

<template>
    <div class="flex flex-col justify-between w-[190px] h-[290px] p-[15px] border-secondary-light border-[2px] rounded-[10px]">
        <div class="w-full flex justify-center">
            <img v-if="props.image" :src="props.image">
        </div>
        
        <p class="text-[14pt] font-bold">{{ props.name }}</p>
        <p class="text-secondary-wrapper-light text-[10pt]">{{ props.description }}</p>

        <div class="flex flex-row justify-end font-bold text-[16pt]">
            <p>{{ props.price }}</p>
            <p class="text-secondary-wrapper-light">₽</p>
        </div>

        <div class="flex flex-row items-center text-center justify-center text-secondary-primary font-semibold p-[5px] rounded-[5px] bg-primary-primary">
            <CartIcon class="w-[20px] h-[20px] mr-[5px] [&>*]:fill-secondary-primary"/>
            <p class="text-[10pt]">В корзину</p>
        </div>
    </div>
</template>