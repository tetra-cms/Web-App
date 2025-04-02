<script lang="ts" setup>
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';

import { pluralizeWord } from '~/utils/PluralizeWord';
import { useCartStore } from '~/store/cart';

import CartIcon from "~/assets/svg/cart.svg";

const cart = useCartStore();
const { cartItems } = storeToRefs(cart);
cartItems.value = !import.meta.client || JSON.parse(localStorage.getItem("cart") || '[]');
</script>

<template>
    <DesktopOnly>
        <ContactHeader :contact-general="String(ContactGeneral)" :contact-list="ContactsList"
            :current-city="String(CurrentCity)" />

        <Header :title="String(CompanyData.title)" :subtitle="String(CompanyData.subtitle)"></Header>

        <div class="w-full flex flex-col justify-between">
            <div class="flex flex-row justify-between px-[60px] mb-[20px]">
                <h1 class="font-druk text-[24px] font-bold">{{ $t('headers.cart') }}</h1>

                <div></div>
            </div>
        </div>
    </DesktopOnly>

    <DesktopOnly>
        <div class="w-full flex justify-center">
            <div class="max-w-[1200px] m-auto flex flex-col">
                <div class="w-full flex flex-row">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-secondary-secondary">
                                <th>{{ $t('tables.cart.name') }}</th>
                                <th>{{ $t('tables.cart.amount') }}</th>
                                <th>{{ $t('tables.cart.price') }}</th>
                                <th class="w-[40px]">
                                    <button>
                                        {{ $t('tables.cart.clear') }}
                                    </button>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr class="border-secondary-secondary border-b-[2px]" v-for="cartItem in cartItems">
                                <th>
                                    <div class="flex flex-row items-center">
                                        <img class="w-[64px]" :src="cartItem.productInfo.imageUrl">
                                        <p class="font-normal">{{ cartItem.productInfo.name }}</p>
                                    </div>
                                </th>
                                <th>
                                    <CartButton :id="Number(cartItem.productInfo.id)" />
                                </th>
                                <th>{{ cartItem.productInfo.price.toLocaleString() }} ₽</th>
                                <th>
                                    <button @click="">

                                    </button>
                                </th>
                            </tr>
                        </tbody>
                    </table>

                    <div class="w-[200px] ml-[20px] py-[40px] bg-secondary-secondary px-[15px] rounded-[10px]">

                        <div class="my-[15px]">
                            <div class="flex flex-row justify-between">
                                <p>{{ $t("order.block.summary") }}:</p>
                                <p class="font-bold">{{ cart.summary.toLocaleString() }} ₽</p>
                            </div>

                            <p class="text-secondary-wrapper-light">
                                {{ cartItems.length }}
                                {{ pluralizeWord($t("labels.item.singular"), $t("labels.item.plural"), cartItems.length) }}
                            </p>
                        </div>

                        <Button :label="$t('buttons.placeorder')" attributes="w-full py-[10px]" />
                    </div>
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
                        <CartButton :id="cartItem.productInfo.id"/>
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

        <div 
        v-else 
        class="w-full h-full flex flex-col justify-center items-center">
            <CartIcon/>
            <p>{{ $t('errors.cart.noitems') }}</p>
        </div>
    </MobileOnly>
</template>