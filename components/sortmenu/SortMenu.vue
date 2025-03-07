<script lang="ts" setup>
import AscendingIcon from '~/assets/svg/ascending.svg';
import DescendingIcon from '~/assets/svg/descending.svg';
</script>

<template>
    <div class="absolute bg-secondary-primary p-[20px] right-0 mt-[120px] shadow-xl rounded-[10px] z-[9999]">
        <ul>
            <li class="flex flex-row" @click="$emit('sortChange', 'asc')">
                <AscendingIcon class="w-[24px] h-[24px] mr-[5px]" />
                {{ $t("common.catalog.sort.asc") }}
            </li>

            <li class="flex flex-row" @click="$emit('sortChange', 'desc')">
                <DescendingIcon class="w-[24px] h-[24px] mr-[5px]"/>
                {{ $t("common.catalog.sort.desc") }}
            </li>
        </ul>
    </div>
</template>