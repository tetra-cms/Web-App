<script setup lang="ts">
import type ApiClient from "~/types/api/ApiClient";

const props = defineProps<{
    clients: ApiClient[];
}>();

const model = defineModel<number>();
</script>

<template>
    <ul class="flex flex-col gap-2">
        <li
            v-for="client in props.clients"
            :key="client.id"
            @click="model = client.id"
            class="cursor-pointer rounded-lg p-3 transition-colors duration-200"
            :class="
                model === client.id
                    ? 'bg-primary-primary text-white'
                    : 'bg-secondary-wrapper-light hover:bg-secondary-secondary'
            "
        >
            <p class="font-semibold">
                {{ client.fcs }}
            </p>

            <p class="text-sm opacity-80">
                {{ client.phone }}
            </p>

            <p class="text-sm opacity-80">
                {{ client.address }}
            </p>
        </li>
    </ul>
</template>