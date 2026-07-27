<script lang="ts" setup>
import {
    ContactGeneral,
    ContactsList,
    CurrentCity,
} from "~/content/contactheader/ContactHeaderData";

import { CompanyData } from "~/content/header/HeaderData";

import ErrorGeoIcon from "~/assets/svg/errorgeo.svg";

import { useProducts } from "~/composables/api/useProducts";

import type { ApiProductItem } from "~/types/api/ApiProductItem";
import type { IProductCard } from "~/types/productcard/ProductCard";

const route = useRoute();
const productsApi = useProducts();

const productInfo = ref<ApiProductItem | null>(null);
const productItems = ref<IProductCard[]>([]);

const loadProduct = async () => {
    try {
        productInfo.value = await productsApi.getById(
            Number(route.params.id)
        );
    } catch {
        productInfo.value = null;
    }
};

const loadSimilarProducts = async () => {

    if (!productInfo.value) {
        productItems.value = [];
        return;
    }

    const products = await productsApi.getAll(Number(productInfo.value.category.id));
    productItems.value = products
        .filter(product => product.id !== productInfo.value!.id)
        .slice(0, 6)
        .map(product => ({
            id: String(product.id),
            image: String("api/products/image/" + product.id),
            name: product.name,
            description: product.description,
            price: product.price,
            supply_quantum: product.supply_quantum
        }));
};

await loadProduct();
await loadSimilarProducts();

watch(
    () => route.params.id,
    async () => {
        await loadProduct();
        await loadSimilarProducts();
    }
);
</script>

<template>
        <DesktopOnly>
            <ContactHeader 
                :contact-general="String(ContactGeneral)" 
                :contact-list="ContactsList"
                :current-city="String(CurrentCity)" />

            <Header 
                :title="String(CompanyData.title)" 
                :subtitle="String(CompanyData.subtitle)"></Header>

            <div v-if="productInfo">
                <div class="w-full flex justify-center">
                    <div class="flex flex-col max-w-[1200px]">
                        <div class="w-full flex flex-row">
                            <div class="m-[20px]">
                                <img class="w-[350px] max-w-[350px]" :src="'/' + productInfo.imageUrl">
                            </div>

                            <div class="flex flex-col h-full justify-center items-start w-full">
                                <div class="mb-[20px]">
                                    <h2 class="font-bold text-[32px]">{{ productInfo.name }}</h2>
                                    <p v-if="(productInfo.supply_quantum ?? 1) >= 2">
                                      {{ $t("common.product.supply_quantum") }}: <b>{{ productInfo.supply_quantum }}</b>
                                    </p>
                                    <div class="flex flex-row [&>*]:fill-secondary-wrapper-light text-secondary-wrapper-light">
                                        <component :is="useSVGIcon(String(productInfo.categoryInfo?.icon_url))"></component>
                                        <p class="mx-[5px]">{{ productInfo.categoryInfo?.name }}</p>
                                    </div>
                                </div>

                                <CartButton 
                                    :id="Number(productInfo.id)"
                                    :price="productInfo.price * (productInfo.supply_quantum ?? 1)"
                                    attributes="w-full py-[10px]"/>
                            </div>
                        </div>

                        <div class="mt-[50px]">
                            <p class="uppercase font-black mb-[10px] text-[24px]">{{ $t("common.product.description") }}</p>
                            <p>{{ productInfo.description }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="productItems.length" class="w-full mt-[40px] px-[100px]">
                    <div class="mb-[10px]">
                        <p class="uppercase font-black text-[24px]">{{ $t("common.product.similar") }}</p>
                        <p class="text-secondary-wrapper-light" >{{ $t("common.product.moreproducts") }}</p>
                    </div>
                    
                    
                    <ProductList :items="productItems.slice(0, 6)" />
                </div>
            </div>

            <div class="mt-[50px] flex justify-center items-center flex-col text-center" v-else>
                <ErrorGeoIcon class="w-[148px] [&>*]:fill-primary-primary"/>
                <p class="text-[32px] font-bold">{{ $t("errors.product.404.title") }}</p>
                <RouterLink class="text-[24px]" to="/">{{ $t("errors.product.404.button") }}</RouterLink>
            </div>       
        </DesktopOnly>

        <MobileOnly>
            <div v-if="productInfo">
                <div class="w-full pb-[100px]">
                    <div class="m-[60px]">
                        <img class="w-full object-contain" :src="'/' + productInfo.imageUrl">
                    </div>

                    <div class="px-[10px]">
                        <div class="mb-[25px]">
                            <h2 class="text-[32px] font-bold">{{ productInfo.name }}</h2>
                            <div class="flex flex-row [&>*]:fill-secondary-wrapper-light text-secondary-wrapper-light">
                                <component :is="useSVGIcon(String(productInfo.categoryInfo?.icon_url))"></component>
                                <p class="mx-[5px]">{{ productInfo.categoryInfo?.name }}</p>
                            </div>
                        </div>

                        <div class="flex flex-col gap-[10px] px-[10px]">
                            <div class="bg-secondary-secondary p-[10px] w-full rounded-[5px]">
                                {{ $t("common.product.price") }}: <b>{{ productInfo.price }} ₽</b>
                            </div>

                            <div 
                              v-if="(productInfo.supply_quantum ?? 1) >= 2" 
                              class="bg-secondary-secondary p-[10px] w-full rounded-[5px]">
                                {{ $t("common.product.supply_quantum") }}: <b>{{ productInfo.supply_quantum }}</b>
                            </div>
                        </div>


                        <div class="mt-[30px]">
                            <p class="uppercase font-black mb-[10px] text-[24px]">{{ $t("common.product.description") }}</p>
                            <p>{{ productInfo.description }}</p>
                        </div>
                    </div>
                    
                </div>

                <CartAction :product-id="productInfo.id" :product-price="productInfo.price * (productInfo.supply_quantum ?? 1)" />
            </div>

            <div 
                v-else
                class="mt-[50px] flex justify-center items-center flex-col text-center">

                <ErrorGeoIcon class="w-[148px] [&>*]:fill-primary-primary"/>
                <p class="text-[32px] font-bold">{{ $t("errors.product.404.title") }}</p>
                <RouterLink class="text-[24px]" to="/">{{ $t("errors.product.404.button") }}</RouterLink>
            </div>
        </MobileOnly>
</template>