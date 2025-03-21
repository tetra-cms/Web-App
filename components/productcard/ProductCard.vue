<script setup lang="ts">
import type { IProductCard } from '~/types/productcard/ProductCard';
const props = defineProps<IProductCard>();
</script>

<template>
    <DesktopOnly>
        <div class="flex flex-col justify-between w-[190px] h-[290px] p-[15px] border-secondary-secondary border-[3px] rounded-[10px]">
            <NuxtLink :to="'/product/' + props.id">
                <div class="w-full flex justify-center">
                    <img class="max-h-[85px]" v-if="props.image" :src="props.image">
                </div>
            
                <p class="text-[14pt] font-bold">{{ props.name }}</p>
                <p class="text-[10pt]">{{ props.description.substring(0, 50) + "..." }}</p>
            </NuxtLink>

            <div class="flex flex-row justify-end font-black text-[16pt]">
                <p>{{ props.price }} ₽</p>
            </div>

            <CartButton 
                :id="Number(props.id)"/>
        </div>
    </DesktopOnly>

    <MobileOnly>
        <div class="flex flex-col justify-between w-[180px] h-[250px] border-secondary-secondary border-[3px] p-[15px] rounded-[10px]">
            <NuxtLink :to="'/product/' + props.id">
                <div class="w-full flex justify-center">
                    <img v-if="props.image" :src="props.image">
                </div>
            
                <p class="text-[14pt] font-bold">{{ props.name }}</p>
                <p class="text-[10pt]">{{ props.description.substring(0, 50) + "..." }}</p>

                <div class="font-black text-primary-primary text-[16pt]">
                    <p>{{ props.price }} ₽</p>
                </div>
            </NuxtLink>
        </div>
    </MobileOnly>
</template>