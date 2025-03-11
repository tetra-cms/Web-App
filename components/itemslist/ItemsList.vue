<script setup lang="ts">
import type { IItemListItem } from '~/types/ItemListItem';
import DesktopOnly from '../directives/DesktopOnly.vue';

const props = defineProps<{
    items: Array<IItemListItem>
}>();

const route = useRoute();
function isSelectedItem(sourceRoute: string) : boolean
{
    if (
        sourceRoute != "" &&
        String(route.fullPath.substring(1, route.fullPath.length)).includes(String(sourceRoute))) {
        return true;
    } else if (
        sourceRoute == "" &&
        route.fullPath == "/") {
        return true;
    } else {
        return false;
    }
}
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
            <li :class="'flex flex-row transition-all transition-250 items-center my-[5px] p-[5px] rounded-[5px] ' 
            + (isSelectedItem(String(item.route)) ? 'text-secondary-primary [&>*]:fill-secondary-primary bg-primary-primary ' : 'hover:bg-secondary-light')" 
            v-for="item in props.items">
                <RouterLink :to="String(item.route)" class="flex flex-row">
                    <div class="w-[20px] h-[20px] mr-[5px]">
                        <component :is="item.icon" />
                    </div>

                    <p class="font-medium select-none">{{ item.label }}</p>
                </RouterLink>
            </li>
        </ul>
    </DesktopOnly>
    
    <MobileOnly>
        <ul class="flex w-full items-list justify-center flex-row overflow-x-auto pl-[150px]">
            <li :class="'flex flex-row justify-center items-center p-[15px] m-[5px] rounded-[5px] '
            + (isSelectedItem(String(item.route)) ? 'text-primary-primary [&>*]:fill-secondary-light bg-primary-primary ' : 'hover:bg-secondary-light bg-secondary-light')" v-for="item in props.items">
                <RouterLink :to="String(item.route)">
                    <div class="w-[20px] h-[20px]">
                        <component :is="item.icon" />
                    </div>
                </RouterLink>
            </li>
        </ul>
    </MobileOnly>
</template>