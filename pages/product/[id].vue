<script lang="ts" setup>
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';
import type { ApiProductItem } from '~/types/api/ApiProductItem';
import ErrorGeoIcon from "~/assets/svg/errorgeo.svg";
import type { IProductCard } from '~/types/productcard/ProductCard';

async function getProductList(category: number)
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

const route = useRoute();
const response: ApiProductItem  = await $fetch('/product/' + route.params.id, {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET'
});
const productInfo: Ref<ApiProductItem> = ref(response);

const productItems: Ref<Array<IProductCard>> = ref([]);
productItems.value = await getProductList(response.categoryId);

productItems.value = productItems.value.filter(item => {
  return item.id != String(response.id);
})

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
                            <div>
                                <img class="w-[450px] max-w-[450px]" :src="'/' + productInfo.imageUrl">
                            </div>

                            <div class="flex flex-col h-full justify-center items-start w-full">
                                <div class="mb-[20px]">
                                    <h2 class="font-bold text-[32px]">{{ productInfo.name }}</h2>
                                    <div class="flex flex-row [&>*]:fill-secondary-wrapper-light text-secondary-wrapper-light">
                                        <component :is="useSVGIcon(String(productInfo.categoryInfo?.iconUrl))"></component>
                                        <p class="mx-[5px]">{{ productInfo.categoryInfo?.name }}</p>
                                    </div>
                                </div>

                                <CartButton 
                                    :id="Number(productInfo.id)"
                                    :price="productInfo.price"
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
                <div class="w-full">
                    <div class="m-[60px]">
                        <img class="w-full object-contain" :src="'/' + productInfo.imageUrl">
                    </div>

                    <div class="mb-[25px]">
                        <h2 class="text-[32px] font-bold">{{ productInfo.name }}</h2>
                        <div class="flex flex-row [&>*]:fill-secondary-wrapper-light text-secondary-wrapper-light">
                            <component :is="useSVGIcon(String(productInfo.categoryInfo?.iconUrl))"></component>
                            <p class="mx-[5px]">{{ productInfo.categoryInfo?.name }}</p>
                        </div>
                    </div>

                    <div class="px-[10px]">
                        <div class="bg-secondary-secondary p-[10px] w-full rounded-[5px]">
                            {{ $t("common.product.price") }}: <b>{{ productInfo.price }} ₽</b>
                        </div>
                    </div>


                    <div class="mt-[30px]">
                        <p class="uppercase font-black mb-[10px] text-[24px]">{{ $t("common.product.description") }}</p>
                        <p>{{ productInfo.description }}</p>
                    </div>
                </div>

                <CartAction :product-id="productInfo.id" :product-price="productInfo.price" />
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