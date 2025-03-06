<script lang="ts" setup>
import ArrowDownIcon from "~/assets/svg/arrow-down.svg";


</script>

<template>
    <div class="flex flex-row items-center">
        <p class="mr-[5px]">{{ $t('common.catalog.sortby') }}</p>
        
        <div class="flex flex-row items-center">
            <p class="select-none text-primary-primary mr-[2px]">по цене</p>
            <ArrowDownIcon />
        </div>
    </div>
</template>