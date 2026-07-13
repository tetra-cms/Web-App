<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useProducts } from "~/composables/api/useProducts";
import type { IProductCard } from "~/types/productcard/ProductCard";
import { ContactGeneral, ContactsList, CurrentCity } from "~/content/contactheader/ContactHeaderData";
import { CompanyData } from "~/content/header/HeaderData";
import { useCartStore } from "~/stores/cart";
import type { ApiProductItem } from "~/types/api/ApiProductItem";

import TrashIcon from '~/assets/svg/trashbox.svg';
import CartIcon from '~/assets/svg/cart.svg';
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const cart = useCartStore();
const productsApi = useProducts();

const { cartItems } = storeToRefs(cart);

const productItems = ref<IProductCard[]>([]);

const showModalClear = ref(false);
const cartProducts = ref<ApiProductItem[]>([]);

onMounted(async () => {
    cart.loadCart();

    const products = await productsApi.getAll();

    productItems.value = shuffleArray(
        products.map(product => ({
            id: String(product.id),
            image: product.imageUrl,
            description: product.description,
            name: product.name,
            price: product.price,
        }))
    ).slice(0, 6);

    cartProducts.value = await Promise.all(
        cart.cartItems.map(item =>
            productsApi.getById(item.productId)
        )
    );
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
</script>

<template>
    <ModalWindow :title="t('modal.clearwindow.clear_cart')" v-model="showModalClear">
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

    <DesktopOnly>
        <ContactHeader :contact-general="String(ContactGeneral)" :contact-list="ContactsList"
            :current-city="String(CurrentCity)" />

        <Header :title="String(CompanyData.title)" :subtitle="String(CompanyData.subtitle)"></Header>

        <div v-if="cartItems.length">
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
                    <table class="w-full text-center">
                        <thead>
                            <tr class="rounded-[30px] bg-secondary-secondary">
                                <th>{{ $t('tables.cart.name') }}</th>
                                <th>{{ $t('tables.cart.amount') }}</th>
                                <th>{{ $t('tables.cart.price') }}</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                          <tr
                              v-for="item in cartView"
                              :key="item.productId"
                              class="w-full py-[15px] border-secondary-secondary border-b-[2px]"
                          >
                              <td class="py-[15px]">
                                  <div
                                      v-if="item.product"
                                      class="flex flex-row items-center"
                                  >
                                      <img
                                          class="w-[64px] mr-[5px]"
                                          :src="item.product.imageUrl"
                                      />

                                      <p class="font-normal">
                                          {{ item.product.name }}
                                      </p>
                                  </div>
                              </td>

                              <td>
                                  <CartButton
                                      :id="item.productId"
                                  />
                              </td>

                              <td
                                  v-if="item.product"
                                  class="font-bold"
                              >
                                  {{ item.product.price.toLocaleString() }} ₽
                              </td>

                              <td>
                                  <button
                                      @click="cart.remove(item.productId)"
                                  >
                                      <TrashIcon />
                                  </button>
                              </td>
                          </tr>
                      </tbody>
                    </table>


                    <div class="flex flex-col w-[320px] ml-[20px]">
                        <div class="w-full py-[40px] bg-secondary-secondary px-[15px] rounded-[10px]">
                            <div class="my-[15px]">
                                <div class="flex flex-row justify-between">
                                    <p>{{ $t("order.block.summary") }}:</p>
                                    <p class="font-bold">{{ totalPrice.toLocaleString() }} ₽</p>
                                </div>

                                <p v-if="cartItems.length" class="text-secondary-wrapper-light">
                                    {{ cartItems.length }}
                                    {{ pluralizeWord($t("labels.item.singular"), $t("labels.item.plural"), cartItems.length)
                                    }}
                                </p>
                            </div>

                            <Button :label="$t('buttons.placeorder')" attributes="w-full py-[10px]" />
                        </div>

                        <div class="mt-[10px] bg-secondary-secondary">

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
        <div v-if="cartItems.length">
            <div class="flex flex-start flex-row items-center">
                <h1 class="text-[24px] font-bold">{{ $t('headers.cart') }}</h1>
                <p class="text-secondary-wrapper-light ml-[10px]">
                    {{ cartItems.length }}
                    {{ pluralizeWord($t("labels.item.singular"), $t("labels.item.plural"), cartItems.length) }}
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

            <ul>
                <li class="flex flex-col mx-[5px] my-[10px] p-[10px] rounded-[10px] bg-secondary-secondary"
                    v-for="cartItem in cartView">
                    <div class="flex flex-row">
                        <div>
                            <img class="w-[96px]" :src="'/api/product/images/' + cartItem.productId">
                        </div>

                        <div class="flex flex-col">
                            <p class="text-[14pt]">{{ cartItem.product?.name }}</p>

                            <p>{{ cartItem.product?.price.toLocaleString() }} ₽</p>
                        </div>
                    </div>

                    <div>
                        <CartButton :id="cartItem.product?.id" />
                    </div>
                </li>
            </ul>

            <OrderAction :amount="cartItems.length" :summary="totalPrice" />

            <div class="mx-[5px]">
                <div class="flex flex-row justify-between">
                    <p>{{ $t("order.block.summary") }}:</p>
                    <p class="font-bold">{{ totalPrice.toLocaleString() }} ₽</p>
                </div>

                <p class="text-secondary-wrapper-light">
                    {{ cartItems.length }}
                    {{ pluralizeWord($t("labels.item.singular"), $t("labels.item.plural"), cartItems.length) }}
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