<script lang="ts" setup>
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';

import { pluralizeWord } from '~/utils/PluralizeWord';
import { useCartStore } from '~/store/cart';

import CartIcon from "~/assets/svg/cart.svg";
import TrashIcon from "~/assets/svg/trashbox.svg";
import type { ApiProductItem } from '~/types/api/ApiProductItem';
import type { IProductCard } from '~/types/productcard/ProductCard';

const cart = useCartStore();
const { cartItems } = storeToRefs(cart);
cartItems.value = !import.meta.client || JSON.parse(localStorage.getItem("cart") || '[]');

async function getProductList(category?: number)
{
  let productListResponse : Array<ApiProductItem> = [];

  let queryParams : { category?: number } = {};
  queryParams.category = category;

  productListResponse = await $fetch('/product/list', {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET',
    query: queryParams
  });

  let productResponse: Array<IProductCard> = [];
  productListResponse.forEach((product) => {
    productResponse.push(
    {
      id: String(product.id),
      image: product.imageUrl,
      description: product.description,
      name: product.name,
      price: product.price
    });
  });
  
  return productResponse;
}

const productItems: Ref<Array<IProductCard>> = ref([]);
productItems.value = await getProductList();
productItems.value = shuffleArray(productItems.value).slice(0, 6);
</script>

<template>
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
                <button class="flex flex-row items-center font-normal text-[12pt] mb-[15px]">
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
                            <tr class="w-full py-[15px] border-secondary-secondary border-b-[2px]"
                                v-for="cartItem in cartItems">
                                <td class="py-[15px]">
                                    <div class="flex flex-row items-center">
                                        <img class="w-[64px] mr-[5px]" :src="cartItem.productInfo.imageUrl">
                                        <p class="font-normal">{{ cartItem.productInfo.name }}</p>
                                    </div>
                                </td>

                                <td>
                                    <CartButton :id="Number(cartItem.productInfo.id)" />
                                </td>

                                <td class="font-bold">{{ cartItem.productInfo.price.toLocaleString() }} ₽</td>

                                <td>
                                    <button @click="">

                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <div class="flex flex-col w-[230px] ml-[20px]">
                        <div class="w-full py-[40px] bg-secondary-secondary px-[15px] rounded-[10px]">
                            <div class="my-[15px]">
                                <div class="flex flex-row justify-between">
                                    <p>{{ $t("order.block.summary") }}:</p>
                                    <p class="font-bold">{{ cart.summary.toLocaleString() }} ₽</p>
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
                <p class="text-primary-primary uppercase font-bold text-[16pt]">{{ $t("tables.cart.emptycart.title") }}</p>
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


            <ul>
                <li class="flex flex-col mx-[5px] my-[10px] p-[10px] rounded-[10px] flex-row bg-secondary-secondary"
                    v-for="cartItem in cartItems">
                    <div class="flex flex-row">
                        <div>
                            <img class="w-[96px]" :src="cartItem.productInfo.imageUrl">
                        </div>

                        <div class="flex flex-col">
                            <p class="text-[14pt]">{{ cartItem.productInfo.name }}</p>

                            <p>{{ cartItem.productInfo.price.toLocaleString() }} ₽</p>
                        </div>
                    </div>

                    <div>
                        <CartButton :id="cartItem.productInfo.id" />
                    </div>
                </li>
            </ul>

            <OrderAction :amount="cartItems.length" :summary="cart.summary" />

            <div class="mx-[5px]">
                <div class="flex flex-row justify-between">
                    <p>{{ $t("order.block.summary") }}:</p>
                    <p class="font-bold">{{ cart.summary.toLocaleString() }} ₽</p>
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