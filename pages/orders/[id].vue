<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useOrdersApi } from "~/composables/api/useOrdersApi";

import { ContactGeneral, ContactsList, CurrentCity } from "~/content/contactheader/ContactHeaderData";
import { CompanyData } from "~/content/header/HeaderData";

const { t } = useI18n();

const route = useRoute();

const ordersApi = useOrdersApi();
const order = await ordersApi.getById(Number(route.params.id));

const statusMap: Record<string, string> = {
    IN_PROGRESS: t("order.status.IN_PROGRESS"),
    CANCELLED: t("order.status.CANCELLED"),
    RECEIVED: t("order.status.RECEIVED"),
    IN_DELIVERY: t("order.status.IN_DELIVERY"),
    ASSEMBLED: t("order.status.ASSEMBLED"),
    PENDING_PAYMENT: t("order.status.PENDING_PAYMENT"),
};

const paymentMap: Record<string, string> = {
    CASH: t("order.payments.CASH"),
    NON_CASH: t("order.payments.NONCASH")
};

const deliveryMap: Record<string, string> = {
    PICKUP: t("order.deliveryes.PICKUP"),
    DELIVERY: t("order.deliveryes.DELIVERY")
};

const formatDate = (value: string) =>
    new Date(value).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
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

      <div class="flex justify-center py-8">
          <div class="w-full max-w-[1300px] px-6">

              <h1 class="text-3xl font-bold mb-6">
                  {{ $t("order.order") }} №{{ order.id }}
              </h1>

              <div class="grid grid-cols-[350px_1fr] gap-8">
                  <div
                      class="rounded-xl bg-secondary-primary p-6 h-fit shadow"
                  >
                      <h2 class="font-bold text-xl mb-4">
                          {{ $t("order.information") }}
                      </h2>

                      <div class="space-y-3">

                          <div>
                              <p class="font-bold text-secondary-wrapper-light">
                                  {{ $t("order.status.status") }}
                              </p>

                              <p class="font-medium">
                                  {{ statusMap[order.status] }}
                              </p>
                          </div>

                          <div>
                              <p class="font-bold text-secondary-wrapper-light">
                                  {{ $t("order.created") }}
                              </p>

                              <p>
                                  {{ formatDate(order.created_at) }}
                              </p>
                          </div>

                          <div>
                              <p class="font-bold text-secondary-wrapper-light">
                                  {{ $t("order.client") }}
                              </p>

                              <p>{{ order.client.fcs }}</p>
                              <p>{{ order.client.phone }}</p>
                              <p>{{ order.client.city }}</p>
                              <p>{{ order.client.address }}</p>
                          </div>

                          <div>
                              <p class="font-bold text-secondary-wrapper-light">
                                  {{ $t("order.delivery") }}
                              </p>

                              <p>{{ deliveryMap[order.delivery_type] }}</p>
                          </div>

                          <div>
                              <p class="font-bold text-secondary-wrapper-light">
                                  {{ $t("order.payment") }}
                              </p>

                              <p>{{ paymentMap[order.payment_type] }}</p>
                          </div>

                          <div v-if="order.comment">
                              <p class="font-bold text-secondary-wrapper-light">
                                  {{ $t("order.comment") }}
                              </p>

                              <p>
                                  {{ order.comment }}
                              </p>
                          </div>

                      </div>
                  </div>

                  <div
                      class="rounded-xl bg-secondary-primary p-6 shadow"
                  >
                      <h2 class="font-bold text-xl mb-5">
                          {{ $t("order.positions") }}
                      </h2>

                      <div
                          v-for="position in order.positions"
                          :key="position.id"
                          class="flex justify-between items-center py-4 border-b border-secondary-secondary last:border-none"
                      >
                          <div class="flex items-center gap-5">

                              <img
                                  class="w-24 h-24 object-cover rounded-lg"
                                  :src="`/api/products/image/${position.product.id}`"
                              >

                              <div>

                                  <NuxtLink
                                      class="font-semibold hover:underline"
                                      :to="`/product/${position.product.id}`"
                                  >
                                      {{ position.product.name }}
                                  </NuxtLink>

                                  <p
                                      class="text-secondary-wrapper-light text-sm mt-1"
                                  >
                                      {{ position.product.description.substring(0, 20) + (position.product.description.length < 20 ? "" : "...") }}
                                  </p>

                              </div>

                          </div>

                          <div
                              class="text-right min-w-[180px]"
                          >
                              <p>
                                  {{ position.quantity }} × {{ position.price * (position.product.supply_quantum ?? 1) }} ₽
                              </p>

                              <p
                                  class="font-bold text-lg mt-2"
                              >
                                  {{ position.quantity * position.price * (position.product.supply_quantum ?? 1) }} ₽
                              </p>
                          </div>
                      </div>

                      <div
                          class="flex justify-end mt-8"
                      >
                          <div
                              class="rounded-lg bg-secondary-secondary px-6 py-4"
                          >
                              <p>
                                  {{ $t("order.total_quantity") }}:
                                  <b>{{ order.total_quantity }}</b>
                              </p>

                              <p class="text-2xl font-bold mt-2">
                                  {{ order.total_price }} ₽
                              </p>
                          </div>
                      </div>

                  </div>

              </div>

          </div>
      </div>
    </DesktopOnly>

    <MobileOnly>

      <div class="px-4 py-5">

          <h1 class="text-2xl font-bold mb-5">
              {{ $t("order.order") }} №{{ order.id }}
          </h1>

          <div
              class="bg-secondary-primary rounded-xl p-4 shadow mb-5"
          >
              <h2 class="text-lg font-bold mb-4">
                  {{ $t("order.information") }}
              </h2>

              <div class="space-y-4">

                  <div>
                      <p class="font-bold text-sm">
                          {{ $t("order.status.status") }}
                      </p>

                      <p class="font-medium">
                          {{ statusMap[order.status] }}
                      </p>
                  </div>

                  <div>
                      <p class="font-bold text-sm">
                          {{ $t("order.created") }}
                      </p>

                      <p>
                          {{ formatDate(order.created_at) }}
                      </p>
                  </div>

                  <div>
                      <p class="font-bold text-sm">
                          {{ $t("order.client") }}
                      </p>

                      <p>{{ order.client.fcs }}</p>
                      <p>{{ order.client.phone }}</p>
                      <p>{{ order.client.city }}</p>
                      <p>{{ order.client.address }}</p>
                  </div>

                  <div>
                      <p class="font-bold text-sm">
                          {{ $t("order.delivery") }}
                      </p>

                      <p>
                          {{ deliveryMap[order.delivery_type] }}
                      </p>
                  </div>

                  <div>
                      <p class="font-bold text-sm">
                          {{ $t("order.payment") }}
                      </p>

                      <p>
                          {{ paymentMap[order.payment_type] }}
                      </p>
                  </div>

                  <div v-if="order.comment">
                      <p class="font-bold text-sm">
                          {{ $t("order.comment") }}
                      </p>

                      <p>
                          {{ order.comment }}
                      </p>
                  </div>

              </div>
          </div>

          <h2 class="text-xl font-bold mb-4">
              {{ $t("order.positions") }}
          </h2>

          <div
              v-for="position in order.positions"
              :key="position.id"
              class="bg-secondary-primary rounded-xl p-4 mb-4 shadow"
          >

              <NuxtLink
                  :to="`/product/${position.product.id}`"
                  class="flex gap-4"
              >

                  <img
                      class="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                      :src="`/api/products/image/${position.product.id}`"
                  >

                  <div class="flex-1">

                      <h3 class="font-semibold">
                          {{ position.product.name }}
                      </h3>

                      <p
                          class="text-sm text-secondary-wrapper-light mt-1 line-clamp-3"
                      >
                          {{ position.product.description.substring(0, 20) + (position.product.description.length < 20 ? "" : "...") }}
                      </p>

                  </div>

              </NuxtLink>

              <div class="border-t border-secondary-secondary mt-4 pt-4">

                  <div class="flex justify-between">
                      <span>{{ $t("order.quantity") }}</span>

                      <b>
                          {{ position.quantity }}
                      </b>
                  </div>

                  <div class="flex justify-between mt-2">
                      <span>{{ $t("order.price") }}</span>

                      <b>
                          {{
                              position.price *
                              (position.product.supply_quantum ?? 1)
                          }}
                          ₽
                      </b>
                  </div>

                  <div class="flex justify-between mt-2 text-lg">

                      <span>{{ $t("order.total") }}</span>

                      <b>
                          {{
                              position.quantity *
                              position.price *
                              (position.product.supply_quantum ?? 1)
                          }}
                          ₽
                      </b>

                  </div>

              </div>

          </div>

          <div
              class="bg-secondary-primary rounded-xl p-4 shadow mb-[90px]"
          >

              <div class="flex justify-between">

                  <span>
                      {{ $t("order.total_quantity") }}
                  </span>

                  <b>
                      {{ order.total_quantity }}
                  </b>

              </div>

              <div
                  class="flex justify-between mt-3 text-xl font-bold"
              >
                  <span>
                      {{ $t("order.total") }}
                  </span>

                  <span>
                      {{ order.total_price }} ₽
                  </span>
              </div>
          </div>
      </div>
  </MobileOnly>
</template>