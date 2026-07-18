<script setup lang="ts">
import type { IProductCard } from '~/types/productcard/ProductCard';
const props = defineProps<IProductCard>();
</script>

<template>
    <DesktopOnly>
        <div class="flex flex-col justify-between w-[190px] h-[300px] min-h-[300px] p-[15px] border-secondary-secondary border-[3px] rounded-[10px]">
            <NuxtLink :to="'/product/' + props.id">
                <div class="w-full flex justify-center">
                    <img class="max-h-[90px]" v-if="props.image" :src="props.image">
                </div>
            
                <p class="text-[12pt] font-bold">{{ props.name }}</p>
                <p class="text-[8pt]">{{ props.description.substring(0, 20) + (props.description.length < 20 ? "" : "...") }}</p>
            </NuxtLink>

            <div class="flex flex-row justify-end">
                <div class="flex flex-col">
                  <p class="font-black text-[16pt]">
                    {{ (props.price * (props.supply_quantum ?? 1)).toLocaleString('ru-RU') }} ₽
                  </p>

                  <p 
                    class="text-[10pt]" 
                    v-if="(props.supply_quantum ?? 1) >= 2">
                    1 x {{ props.supply_quantum }}
                  </p>
                </div>
            </div>

            <CartButton 
                :id="Number(props.id)"/>
        </div>
    </DesktopOnly>

    <MobileOnly>
        <div class="flex flex-col justify-between w-[180px] h-[250px] border-secondary-secondary border-[3px] p-[15px] rounded-[10px]">
            <NuxtLink
              class="flex flex-col justify-between h-full"
              :to="'/product/' + props.id">
                <div>
                  <div class="w-full flex justify-center">
                      <img class="max-h-[85px]" v-if="props.image" :src="props.image">
                  </div>
              
                  <p class="text-[10pt] font-bold">{{ props.name.length >= 40 ? props.name.substring(0, 40) + "..." : props.name }}</p>
                </div>

                <div class="w-full flex flex-col justify-end">
                    <p class="font-black text-primary-primary text-[14pt]">
                      {{ (props.price * (props.supply_quantum ?? 1)).toLocaleString('ru-RU') }} ₽
                    </p>

                    <p 
                      class="text-[10pt]" 
                      v-if="(props.supply_quantum ?? 1) >= 2">
                      1 x {{ props.supply_quantum }}
                    </p>
                </div>
            </NuxtLink>
        </div>
    </MobileOnly>
</template>