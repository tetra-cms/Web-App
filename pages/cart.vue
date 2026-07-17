<script lang="ts" setup>
import { useI18n } from "vue-i18n";

import { useProducts } from "~/composables/api/useProducts";
import type { IProductCard } from "~/types/productcard/ProductCard";
import { ContactGeneral, ContactsList, CurrentCity } from "~/content/contactheader/ContactHeaderData";
import { CompanyData } from "~/content/header/HeaderData";
import { useCartStore } from "~/stores/cart";
import type { ApiProductItem } from "~/types/api/ApiProductItem";

import TrashIcon from '~/assets/svg/trashbox.svg';
import CartIcon from '~/assets/svg/cart.svg';

import WarehouseIcon from '~/assets/svg/warehouse.svg';
import DeliveryIcon from '~/assets/svg/delivery.svg';

import CashIcon from '~/assets/svg/cash.svg';
import NonCashIcon from '~/assets/svg/noncash.svg';
import type IFormElement from "~/types/form/FormField";
import { FieldType } from "~/types/form/FormField";
import { useOrdersApi } from "~/composables/api/useOrdersApi";
import { useClients } from "~/composables/api/useClients";
import type ApiClient from "~/types/api/ApiClient";

const { t } = useI18n();

const cart = useCartStore();
const productsApi = useProducts();

const user = useUserStore();

const productItems = ref<IProductCard[]>([]);

const showModalClear = ref(false);
const cartProducts = ref<ApiProductItem[]>([]);

const orderType = ref("pickup");
const payType = ref("cash");

const isLoading = ref(true);

onMounted(async () => {
    try {
        cart.loadCart();

        const products = await productsApi.getAll();

        productItems.value = shuffleArray(
            products.map(product => ({
                id: String(product.id),
                image: product.imageUrl,
                description: product.description,
                name: product.name,
                price: product.price,
                supply_quantum: product.supply_quantum
            }))
        ).slice(0, 6);

        cartProducts.value = await Promise.all(
            cart.cartItems.map(item =>
                productsApi.getById(item.productId)
            )
        );
    } finally {
        isLoading.value = false;
    }
});

const cartView = computed(() =>
    cart.cartItems.map(item => ({
        ...item,
        product: cartProducts.value.find(
            p => p.id === item.productId
        ),
    }))
);

const totalPrice = computed(() => {
  return cartView.value.reduce((sum, item) => {
    if (!item.product) return sum;

    return (
      sum +
      item.product.price *
      item.quantity *
      (item.product.supply_quantum ?? 1)
    );
  }, 0);
});

function clearCart()
{
  cart.clear();
  showModalClear.value = false;
}

const openClearModal = () => {
  showModalClear.value = !showModalClear.value;
};

const showModalOrder = ref(false);
async function orderAction()
{
  if (user.isAuthenticated)
  {
    showModalOrder.value = !showModalOrder.value;
  } else {
    await navigateTo('/auth')
  }
}

const clientsApi = useClients();
const clients = ref<ApiClient[]>([]);

if (user.user && user.isAuthenticated)
{
  clients.value = await clientsApi.getAll();
}

const newClientCreationFlag = ref<boolean>(false);
const selectedClientId = ref<number>();

const OrderFormFields = computed<Array<IFormElement>>(() => {

    const fields: IFormElement[] = [
        {
            name: "delivery_type",
            placeholder: t("modal.order.fields.delivery_type"),
            default: orderType.value,
            type: FieldType.Hidden,
        },
        {
            name: "payment_type",
            placeholder: t("modal.order.fields.payment_type"),
            default: payType.value,
            type: FieldType.Hidden,
        },
    ];

    if (clients.value.length === 0 || newClientCreationFlag.value) {
        fields.push(
            {
                name: "fcs",
                placeholder: t("modal.order.fields.fcs"),
                type: FieldType.Input,
                required: true,
            },
            {
                name: "phone",
                placeholder: t("modal.order.fields.phone"),
                type: FieldType.Input,
                required: true,
            },
            {
                name: "city",
                placeholder: t("modal.order.fields.city"),
                type: FieldType.Input,
                required: true,
            },
            {
                name: "address",
                placeholder: t("modal.order.fields.address"),
                type: FieldType.Input,
                required: true,
            },
        );
    }

    fields.push(
        {
            name: "comment",
            placeholder: t("modal.order.fields.commentary"),
            type: FieldType.TextArea,
        },
        {
            name: "submit",
            placeholder: t("modal.order.submit_button"),
            type: FieldType.Button,
        },
    );

    return fields;
});

const orderApi = useOrdersApi();
async function submitOrder(data: any) {
    let clientId = selectedClientId.value;

    if ((!clientId || newClientCreationFlag.value) && !clients.value.length) {
        const client = await clientsApi.create({
            fcs: data.fcs,
            phone: data.phone,
            city: data.city,
            address: data.address,
        });

        clientId = client.id;
    }

    await orderApi.create({
        client_id: clientId,
        comment: data.comment,
        delivery_type: orderType.value.toUpperCase(),
        payment_type: payType.value.toUpperCase(),
        positions: cart.cartItems.map((cartItem) => {
          return {
            product_id: cartItem.productId,
            quantity: cartItem.quantity
          }
        }),
    });

    cart.clear();
}

function changeView()
{
  newClientCreationFlag.value = !newClientCreationFlag.value;
}
</script>

<template>
    <div
        v-if="isLoading"
        class="flex items-center justify-center min-h-[60vh]"
    >
        {{ $t("common.loading") }}
    </div>

    <template v-else>
      <ModalWindow 
        :title="t('modal.clearwindow.clear_cart')"
        v-model="showModalClear">
        <div class="flex flex-col gap-[20px] my-[10px]">
          <div>
            <p>
              {{ t('modal.clearwindow.hint1') }}
            </p>

            <p>
              {{ t('modal.clearwindow.hint2') }}
            </p>
          </div>
        </div>

        <DesktopOnly>
          <div class="flex flex-row mt-[10px] justify-between">
              <button
                  class="text-secondary-primary bg-red-600 px-[15px] py-[10px] rounded-[10px]"
                  @click.prevent="clearCart"
              >
                  {{ $t("common.actions.remove") }}
              </button>

              <button
                  @click.prevent="showModalClear = false"
              >
                  {{ $t("common.actions.cancel") }}
              </button>
          </div>
        </DesktopOnly>

        <MobileOnly>
          <div class="flex flex-col mt-[10px] justify-between">
              <button
                  class="text-secondary-primary bg-red-600 px-[15px] py-[10px] rounded-[10px]"
                  @click.prevent="clearCart"
              >
                  {{ $t("common.actions.remove") }}
              </button>

              <button
                  class="px-[15px] py-[10px]"
                  @click.prevent="showModalClear = false"
              >
                  {{ $t("common.actions.cancel") }}
              </button>
          </div>
        </MobileOnly>
    </ModalWindow>

    <ModalWindow
      :title="t('modal.order.title')"
      class="w-[50%]"
      v-model="showModalOrder"
    >
      <button
          class="py-[10px] text-primary-primary"
          @click.prevent="changeView">
          {{ newClientCreationFlag ? t('client.change_button') : t('client.create_button') }}
      </button>

      <ClientList
          v-if="clients.length && !newClientCreationFlag"
          v-model="selectedClientId"
          :clients="clients"
          class="mb-5 overflow-y-auto"
      />

      <MobileOnly>
        
      </MobileOnly>

      <CustomForm
          class=""
          :fields="OrderFormFields"
          @submitinfo="submitOrder"
      />
    </ModalWindow>
    

    <DesktopOnly>
        <ContactHeader :contact-general="String(ContactGeneral)" :contact-list="ContactsList"
            :current-city="String(CurrentCity)" />

        <Header :title="String(CompanyData.title)" :subtitle="String(CompanyData.subtitle)"></Header>

        <div v-if="cart.amount">
            <div class="w-full flex flex-col justify-between">
                <div class="flex flex-row justify-between px-[60px] mb-[20px]">
                    <h1 class="font-druk text-[24px] font-bold">{{ $t('headers.cart') }}</h1>

                    <div></div>
                </div>
            </div>

            <div class="w-full flex flex-col px-[70px] justify-center">
                <button 
                @click="openClearModal"
                class="flex flex-row items-center font-normal text-[12pt] mb-[15px]">
                    <div class="w-[24px] h-[24px] mr-[10px] flex justify-center bg-[red] rounded-[5px]">
                        <TrashIcon />
                    </div>

                    <p class="text-[red]">{{ $t('tables.cart.clear') }}</p>
                </button>

                <div class="w-full flex flex-row">
                    <table class="w-full table-fixed border-collapse">
                      <thead>
                          <tr class="bg-secondary-secondary">
                              <th class="w-[50%] px-4 py-3 text-left rounded-l-[30px]">
                                  {{ $t('tables.cart.name') }}
                              </th>

                              <th class="w-[20%] px-4 py-3 text-center">
                                  {{ $t('tables.cart.amount') }}
                              </th>

                              <th class="w-[20%] px-4 py-3 text-center">
                                  {{ $t('tables.cart.price') }}
                              </th>

                              <th class="w-[10%] px-4 py-3 rounded-r-[30px]"></th>
                          </tr>
                      </thead>

                      <tbody>
                          <tr
                              v-for="item in cartView"
                              :key="item.productId"
                              class="border-b-2 border-secondary-secondary"
                          >
                              <td class="px-4 py-4">
                                  <div
                                      v-if="item.product"
                                      class="flex items-center gap-3"
                                  >
                                      <img
                                          class="w-16 h-16 object-cover shrink-0"
                                          :src="item.product.imageUrl"
                                      />

                                      <p class="font-normal">
                                          {{ item.product.name }}
                                      </p>
                                  </div>
                              </td>

                              <td class="px-4 py-4 text-center">
                                  <CartButton :id="item.productId" />
                              </td>

                              <td
                                  v-if="item.product"
                                  class="px-4 py-4 text-center font-bold whitespace-nowrap"
                              >
                                  {{ (item.product.price * (item.product.supply_quantum ?? 1)).toLocaleString('ru-RU') }} ₽
                              </td>

                              <td class="px-4 py-4 text-center">
                                  <button @click="cart.remove(item.productId)">
                                      <TrashIcon />
                                  </button>
                              </td>
                          </tr>
                      </tbody>
                  </table>


                    <div class="flex flex-col w-[320px] ml-[20px]">
                        <div class="w-full pt-[10px] pb-[40px] bg-secondary-secondary px-[15px] rounded-[10px]">
                            <div class="my-[15px]">
                                <div class="flex flex-col gap-[10px] mb-[15px]">
                                  <Radio v-model="orderType" value="pickup">
                                    <div :class="'flex flex-row gap-[10px] items-center '">
                                      <WarehouseIcon class="w-[24px] h-[24px]"/>
                                      <div class="flex flex-col"> 
                                        <p class="text-[16px]">
                                          {{ t('order.types.pickup') }}
                                        </p>

                                        <p class="text-[12px] text-secondary-wrapper-dark">
                                          г.Тольятти, ул. Ларина 149
                                        </p>
                                      </div>
                                    </div>
                                  </Radio>

                                  <Radio v-model="orderType" value="delivery">
                                    <div class="flex flex-row gap-[10px] items-center">
                                      <DeliveryIcon class="w-[24px] h-[24px]"/>
                                      <div class="flex flex-col"> 
                                        <p class="text-[16px]">
                                          {{ t('order.types.delivery') }}
                                        </p>
                                      </div>
                                    </div>
                                  </Radio>
                                </div>
                              
                                <div class="flex flex-row justify-between">
                                    <p>{{ $t("order.block.summary") }}:</p>
                                    <p class="font-bold">{{ totalPrice.toLocaleString('ru-RU') }} ₽</p>
                                </div>

                                <p v-if="cart.amount" class="text-secondary-wrapper-light">
                                    {{ cart.amount }}
                                    {{ pluralizeWord($t("labels.item.singular"), $t("labels.item.plural"), cart.amount)
                                    }}
                                </p>
                            </div>

                            <Button 
                              :label="$t('buttons.placeorder')" 
                              attributes="w-full py-[10px]" 
                              @click.prevent="orderAction"/>
                        </div>

                        <div 
                          class="mt-[10px] bg-secondary-secondary rounded-[10px] px-[15px] py-[10px]">
                            <div class="flex flex-col gap-[10px] mb-[15px]">
                              <Radio v-model="payType" value="cash">
                                <div :class="'flex flex-row gap-[10px] items-center '">
                                  <CashIcon class="w-[24px] h-[24px]"/>
                                  <div class="flex flex-col"> 
                                    <p class="text-[16px]">
                                      {{ t('order.types.pay.cash') }}
                                    </p>
                                  </div>
                                </div>
                              </Radio>

                              <Radio v-model="payType" value="non_cash">
                                <div class="flex flex-row gap-[10px] items-center">
                                  <NonCashIcon class="w-[24px] h-[24px]"/>
                                  <div class="flex flex-col"> 
                                    <p class="text-[16px]">
                                      {{ t('order.types.pay.noncash') }}
                                    </p>
                                  </div>
                                </div>
                              </Radio>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-else>
            <div class="w-full flex flex-col text-center items-center">
                <CartIcon class="[&>*]:fill-primary-primary w-[128px] h-[128px]"/>
                <p class="text-primary-primary uppercase font-black text-[16pt]">{{ $t("tables.cart.emptycart.title") }}</p>
                <p class="text-[14pt]">{{ $t("tables.cart.emptycart.subtitle") }}</p>

                <RouterLink
                class="mt-[20px] flex flex-row items-center text-center justify-center select-none text-secondary-primary font-semibold p-[10px] rounded-[30px] bg-primary-primary"
                to="/">{{ $t("buttons.backincatalog") }}</RouterLink>
            </div>

            <h1 class="font-druk mt-[20px] text-[24px] text-center font-bold">{{ $t('headers.mightlike') }}</h1>

            <div class="flex flex-col items-center justify-center">
                <div>
                    <ProductList :items="productItems" />
                </div>
            </div>
        </div>
    </DesktopOnly>

    <MobileOnly>
        <div v-if="cart.amount">
            <div class="flex flex-start flex-row items-center">
                <h1 class="text-[24px] font-bold">{{ $t('headers.cart') }}</h1>
                <p class="text-secondary-wrapper-light ml-[10px]">
                    {{ cart.amount }}
                    {{ pluralizeWord($t("labels.item.singular"), $t("labels.item.plural"), cart.amount) }}
                </p>
            </div>

            <button 
                @click="openClearModal"
                class="flex flex-row items-center font-normal text-[12pt] mb-[15px]">
                    <div class="w-[24px] h-[24px] mr-[10px] flex justify-center bg-[red] rounded-[5px]">
                        <TrashIcon />
                    </div>

                    <p class="text-[red]">{{ $t('tables.cart.clear') }}</p>
            </button>

            <div class="w-full flex flex-row justify-between py-[10px]">
              <div class="flex flex-col">
                <Radio v-model="orderType" value="pickup">
                  <div :class="'flex flex-row gap-[10px] items-center '">
                    <WarehouseIcon class="w-[24px] h-[24px]"/>
                    <div class="flex flex-col"> 
                      <p class="text-[16px]">
                        {{ t('order.types.pickup') }}
                      </p>

                      <p class="text-[12px] text-secondary-wrapper-dark">
                        г.Тольятти, ул. Ларина 149
                      </p>
                    </div>
                  </div>
                </Radio>

                <Radio v-model="orderType" value="delivery">
                  <div class="flex flex-row gap-[10px] items-center">
                    <DeliveryIcon class="w-[24px] h-[24px]"/>
                    <div class="flex flex-col"> 
                      <p class="text-[16px]">
                        {{ t('order.types.delivery') }}
                      </p>
                    </div>
                  </div>
                </Radio>
              </div>

              <div class="flex flex-col gap-[10px] justify-between">
                <Radio v-model="payType" value="cash">
                  <div :class="'flex flex-row gap-[10px] items-center '">
                    <CashIcon class="w-[24px] h-[24px]"/>
                    <div class="flex flex-col"> 
                      <p class="text-[16px]">
                        {{ t('order.types.pay.cash') }}
                      </p>
                    </div>
                  </div>
                </Radio>

                <Radio v-model="payType" value="noncash">
                  <div class="flex flex-row gap-[10px] items-center">
                    <NonCashIcon class="w-[24px] h-[24px]"/>
                    <div class="flex flex-col"> 
                      <p class="text-[16px]">
                        {{ t('order.types.pay.noncash') }}
                      </p>
                    </div>
                  </div>
                </Radio>
              </div>
            </div>

            <ul>
                <li class="flex flex-col mx-[5px] my-[10px] p-[10px] rounded-[10px] bg-secondary-secondary"
                    v-for="cartItem in cartView">
                    <div class="flex flex-row">
                        <div>
                            <img class="w-[96px]" :src="'/api/product/images/' + cartItem.productId">
                        </div>

                        <div class="flex flex-col">
                            <p class="text-[14pt]">{{ cartItem.product?.name }}</p>

                            <p>{{ (Number(cartItem.product?.price) * (cartItem.product?.supply_quantum ?? 1)).toLocaleString('ru-RU') }} ₽</p>
                        </div>
                    </div>

                    <div>
                        <CartButton :id="cartItem.product?.id" />
                    </div>
                </li>
            </ul>

            <OrderAction @click="orderAction" :amount="cart.amount" :summary="totalPrice" />

            <div class="mx-[5px]">
                <div class="flex flex-row justify-between">
                    <p>{{ $t("order.block.summary") }}:</p>
                    <p class="font-bold">{{ totalPrice.toLocaleString('ru-RU') }} ₽</p>
                </div>

                <p class="text-secondary-wrapper-light">
                    {{ cart.amount }}
                    {{ pluralizeWord($t("labels.item.singular"), $t("labels.item.plural"), cart.amount) }}
                </p>
            </div>
        </div>

        <div v-else class="w-full h-full flex flex-col justify-center text-center items-center">
            <CartIcon class="[&>*]:fill-primary-primary w-[96px] h-[96px]" />
            <p class="font-bold text-[24pt]">{{ $t('errors.cart.noitems') }}</p>
            <p class="text-[16pt]">{{ $t('tables.cart.emptycart.subtitle') }}</p>

            <RouterLink
                class="mt-[20px] flex flex-row items-center text-center justify-center select-none text-secondary-primary font-semibold p-[10px] rounded-[30px] bg-primary-primary"
                to="/">{{ $t("buttons.backincatalog") }}</RouterLink>
        </div>
    </MobileOnly>
    </template>
</template>