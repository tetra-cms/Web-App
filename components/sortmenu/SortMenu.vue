<script lang="ts" setup>
</script>

<template>
    <div class="absolute bg-secondary-primary p-[20px] right-0 mt-[120px] shadow-xl rounded-[10px] z-[9999]">
        <ul>
            <li @click="$emit('sortChange', 'asc')">
                {{ $t("common.catalog.sort.asc") }}
            </li>
            
            <li @click="$emit('sortChange', 'desc')">
                {{ $t("common.catalog.sort.desc") }}
            </li>
        </ul>
    </div>
</template>