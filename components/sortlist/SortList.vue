<script lang="ts" setup>
import ArrowDownIcon from "~/assets/svg/arrow-down.svg";

const sortMenuShow = ref(false);
function menuClick()
{
    sortMenuShow.value = !sortMenuShow.value;
}

const emit = defineEmits<{
    sortChange: [value: string]
}>();

const currentSort : Ref<string> = ref("common.catalog.sort.common");
function sortChange(sort: string)
{
    switch (sort)
    {
        case "asc":
        {
            currentSort.value = "common.catalog.sort.asc";
            break;
        }

        default: {
            currentSort.value = "common.catalog.sort.desc";
            break;
        } 
    }
    emit("sortChange", sort);
}
</script>

<template>
    <div class="flex flex-row items-center">
        <p class="mr-[5px]">{{ $t('common.catalog.sortby') }}</p>
        
        <div class="flex flex-row items-center relative hover:cursor-pointer" @click="menuClick">
            <p class="select-none text-primary-primary mr-[2px]">{{ $t(currentSort).toLowerCase() }}</p>
            <ArrowDownIcon />

            <SortMenu
                @sort-change="sortChange"
                v-if="sortMenuShow"
            />
        </div>
    </div>
</template>