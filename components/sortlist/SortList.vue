<script lang="ts" setup>
import ArrowDownIcon from "~/assets/svg/arrow-down.svg";

const sortMenuShow = ref(false);
function menuClick()
{
    sortMenuShow.value = !sortMenuShow.value;
}
</script>

<template>
    <div class="flex flex-row items-center">
        <p class="mr-[5px]">{{ $t('common.catalog.sortby') }}</p>
        
        <div class="flex flex-row items-center relative hover:cursor-pointer" @click="menuClick">
            <p class="select-none text-primary-primary mr-[2px]">по цене</p>
            <ArrowDownIcon />

            <SortMenu 
                v-if="sortMenuShow"
            />
        </div>
    </div>
</template>