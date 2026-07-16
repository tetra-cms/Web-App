<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type ApiOrder from "~/types/api/ApiOrder";

const { t } = useI18n();

const props = defineProps<{
    orders: ApiOrder[];
}>();

const model = defineModel<number>();

const pad = (num: number) => String(num).padStart(2, '0');
const formatDate = (value: string) => {
    const date = new Date(value);
    return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
};

const orderStatus: Record<string, string> = {
    IN_PROGRESS: t('order.status.IN_PROGRESS'),
    CANCELLED: t('order.status.CANCELLED'),
    RECEIVED: t('order.status.RECEIVED'),
    IN_DELIVERY: t('order.status.IN_DELIVERY'),
    ASSEMBLED: t('order.status.ASSEMBLED'),
    PENDING_PAYMENT: t('order.status.PENDING_PAYMENT'),
};

const getStatusLabel = (status: string) =>
    orderStatus[status] ?? status;
</script>

<template>
    <ul class="flex flex-col gap-2">
        <li
            v-for="order in props.orders"
            :key="order.id"
            @click="model = order.id"
            class="cursor-pointer rounded-lg p-4 transition-colors duration-200"
            :class="
                model === order.id
                    ? 'bg-primary-primary text-white'
                    : 'bg-secondary-wrapper-light hover:bg-secondary-secondary'
            "
        >
            <div class="flex justify-between items-center">
                <p class="font-semibold">
                    Заказ №{{ order.id }}
                </p>

                <p class="text-sm">
                    {{ getStatusLabel(order.status) }}
                </p>
            </div>

            <div class="mt-2 text-sm opacity-80">
                <p>
                    {{ order.total_quantity }} товаров
                </p>

                <p>
                    {{ order.total_price }} ₽
                </p>

                <p v-if="order.comment">
                    {{ order.comment }}
                </p>

                <p>
                    {{ formatDate(order.created_at) }}
                </p>
            </div>
        </li>
    </ul>
</template>