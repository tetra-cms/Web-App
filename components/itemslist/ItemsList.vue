<script setup lang="ts">
import type { IItemListItem } from '~/types/ItemListItem';
import DesktopOnly from '../directives/DesktopOnly.vue';

const props = defineProps<{
    items: Array<IItemListItem>
}>();
</script>

<template>
    <DesktopOnly>
        <ul class="flex flex-col">
            <li class="flex flex-row items-center p-[5px]" v-for="item in props.items">
                <div class="w-[18px] h-[18px] mr-[5px]">
                    <component :is="item.icon" />
                </div>

                <p class="font-medium">{{ item.label }}</p>
            </li>
        </ul>
    </DesktopOnly>
    
    <MobileOnly>
        <ul class="flex w-full justify-center flex-row overflow-x-auto pl-[60px]">
            <li class="flex flex-row items-center p-[10px] m-[5px] bg-secondary-light rounded-[5px]" v-for="item in props.items">
                <div class="w-[18px] h-[18px]">
                    <component :is="item.icon" />
                </div>
            </li>
        </ul>
    </MobileOnly>
</template>