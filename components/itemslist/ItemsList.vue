<script setup lang="ts">
import type { IItemListItem } from '~/types/ItemListItem';
import DesktopOnly from '../directives/DesktopOnly.vue';

const props = defineProps<{
    items: Array<IItemListItem>
}>();
</script>

<style scoped>
    .items-list::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 0;
        height: 0;
    }
</style>

<template>
    <DesktopOnly>
        <ul class="flex flex-col">
            <li class="flex flex-row transition-all transition-250 items-center p-[5px] hover:bg-secondary-light " v-for="item in props.items">
                <div class="w-[20px] h-[20px] mr-[5px]">
                    <component :is="item.icon" />
                </div>

                <p class="font-medium select-none">{{ item.label }}</p>
            </li>
        </ul>
    </DesktopOnly>
    
    <MobileOnly>
        <ul class="flex w-full items-list justify-center flex-row overflow-x-auto pl-[150px]">
            <li class="flex flex-row justify-center items-center p-[15px] m-[5px] bg-secondary-light rounded-[5px]" v-for="item in props.items">
                <div class="w-[20px] h-[20px]">
                    <component :is="item.icon" />
                </div>
            </li>
        </ul>
    </MobileOnly>
</template>