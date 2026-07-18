<script setup lang="ts">
import { useOrdersApi } from "~/composables/api/useOrdersApi";
import {
    ContactGeneral,
    ContactsList,
    CurrentCity,
} from "~/content/contactheader/ContactHeaderData";
import { CompanyData } from "~/content/header/HeaderData";

definePageMeta({
    layout: "default",
});

const ordersApi = useOrdersApi();
const orders = await ordersApi.getMy();

const selectedOrderId = ref<number>();

watch(selectedOrderId, async (id) => {
    if (!id) return;
    await navigateTo(`/orders/${id}`);
});
</script>

<template>
    <DesktopOnly>
        <ContactHeader
            :contact-general="String(ContactGeneral)"
            :contact-list="ContactsList"
            :current-city="String(CurrentCity)"
        />

        <Header
            :title="String(CompanyData.title)"
            :subtitle="String(CompanyData.subtitle)"
        />

        <div class="flex justify-center py-10">
            <div class="w-full max-w-[1200px]">
                <h1 class="mb-6 text-3xl font-bold">
                    {{ $t("order.title") }}
                </h1>

                <OrderList
                    v-if="orders.length"
                    v-model="selectedOrderId"
                    :orders="orders"
                />

                <div
                    v-else
                    class="py-16 text-center text-secondary-wrapper-light"
                >
                    {{ $t("orders.empty") }}
                </div>
            </div>
        </div>
    </DesktopOnly>

    <MobileOnly>
      <div class="pb-[100px]">
        <div class="mt-[20px]">
          <Header
            :title="String(CompanyData.title)"
            :subtitle="String(CompanyData.subtitle)"
          />
        </div>

        <div class="px-4 py-6">
            <h1 class="mb-4 text-2xl font-bold">
                {{ $t("order.title") }}
            </h1>

            <OrderList
                v-if="orders.length"
                v-model="selectedOrderId"
                :orders="orders"
            />

            <div
                v-else
                class="py-10 text-center text-secondary-wrapper-light"
            >
                {{ $t("orders.empty") }}
            </div>
        </div>
      </div>
    </MobileOnly>
</template>