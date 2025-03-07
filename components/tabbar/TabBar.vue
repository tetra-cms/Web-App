<script lang="ts" setup>
import type { TabBarElement } from '~/types/tabbar/TabBarElement';

const props = defineProps<{
    elements: Array<TabBarElement>
}>();
</script>

<template>
    <div class="w-full fixed bottom-0 h-[60px] border-t-[1px] border-secondary-light bg-secondary-primary flex flex-col items-center">
        <ul class="flex justify-center">
            <li v-for="tabbarItem in props.elements" class="p-[10px]">
                <NuxtLink :to="tabbarItem.route" class="flex justify-center flex-col items-center">
                    <component 
                    :class="tabbarItem.route == $route.path ? '[&>*]:fill-secondary-wrapper-dark w-[24px] h-[24px]' : '[&>*]:fill-secondary-wrapper-light w-[24px] h-[24px]'" :is="tabbarItem.icon"/>
                    <p 
                    :class="tabbarItem.route == $route.path ? 'text-secondary-wrapper-dark text-[8pt]' : 'text-[8pt] text-secondary-wrapper-light'">{{ tabbarItem.label }}</p>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>