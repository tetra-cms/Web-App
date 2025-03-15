<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';
import { ProductListItems } from '~/content/productlist/ProductListItems';
import ContactHeader from '~/components/contactheader/ContactHeader.vue';
import ItemsList from '~/components/itemslist/ItemsList.vue';
import InputWithReset from '~/components/inputs/inputwithreset/InputWithReset.vue';
import type { IProductCard } from '~/types/productcard/ProductCard';
import type { IItemListItem } from '~/types/ItemListItem';
import { i18n } from "~/plugins/i18n";
import type { ApiCategoryItem } from '~/types/api/ApiCategoryItem';
import type { ApiProductItem } from '~/types/api/ApiProductItem';

const { t } = i18n.global;

const catResponse: Array<ApiCategoryItem> = await $fetch('/category/list', {
  baseURL: useRuntimeConfig().public.baseURL,
  method: 'GET',
});

let categoryResponse: Array<IItemListItem> = [];
categoryResponse.push({
    name: t("category.all"),
    icon: "categories-squares",
    label: t("category.all"),
    route: ""
});
catResponse.forEach((category) => {
  categoryResponse.push(
    {
      name: category.name,
      icon: category.iconUrl,
      label: category.name,
      route: "?category=" + category.id
    });
});
const categoryItems: Ref<Array<IItemListItem>> = ref(categoryResponse);


let productListResponse : Array<ApiProductItem> = [];

const route = useRoute();
const sortByCategory = route.query.category;
if (!sortByCategory)
{
  productListResponse = await $fetch('/product/list', {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET',
  });
} else {
  productListResponse = await $fetch('/product/list', {
    baseURL: useRuntimeConfig().public.baseURL,
    method: 'GET',
    query: {
      category: sortByCategory
    }
  });
}

let productResponse: Array<IProductCard> = [];
productListResponse.forEach((product) => {
  productResponse.push(
  {
    id: String(product.id),
    image: product.imageUrl,
    description: product.description,
    name: product.name,
    price: product.price,
    categoryId: product.categoryId
  });
});
const productItems: Ref<Array<IProductCard>> = ref(productResponse);


const renderProductList : Ref<boolean> = ref(true);
const listOfProducts : Ref<Array<IProductCard>> = ref(ProductListItems);
async function sortChange(sort: string)
{
    const sortedProducts = ProductListItems.sort(function(a, b) {
      return b.price - a.price;
    });
    listOfProducts.value = sortedProducts;

    if (sort == "desc") {
      listOfProducts.value = sortedProducts.reverse();
    }

    renderProductList.value = false;
    await nextTick();
    renderProductList.value = true;
}
</script>

<template>
  <DesktopOnly>
    <ContactHeader 
        :contact-general="String(ContactGeneral)" 
        :contact-list="ContactsList" 
        :current-city="String(CurrentCity)"/>
    
    <Header 
        :title="String(CompanyData.title)"
        :subtitle="String(CompanyData.subtitle)"></Header>
    
    <div class="w-full flex flex-col justify-between">
        <div class="flex flex-row justify-between px-[60px] mb-[20px]">
          <h1 class="font-druk text-[24px] font-bold">Наша продукция</h1>

          <SortList @sort-change="sortChange"/>
        </div>
        
        <div class="flex flex-row">
            <div class="flex flex-col px-[20px] mr-[20px]">
              <h2 class="text-secondary-wrapper-light font-bold">Категории</h2>
              <ItemsList :items="categoryItems"/>
            </div>
            
            <ProductList 
              :maxElementsPerPage="12"
              v-if="renderProductList && productItems.length"
              :items="productItems"/>

            <div class="w-full" v-else>
              <p class="text-center">{{ $t("common.catalog.error.noitems") }}</p>
            </div>
        </div>
    </div>
  </DesktopOnly>

  <MobileOnly>
    <div class="my-[30px]">
      <Header 
        :title="String(CompanyData.title)"
        :subtitle="String(CompanyData.subtitle)"></Header>
    </div>

    <div class="my-[10px] flex justify-center">
      <InputWithReset
        placeholder="Поиск"
        />
    </div>

    <p class="font-bold">Категории</p>
    <ItemsList :items="categoryItems"/>

    <ProductList
    v-if="productItems.length"
    :items="productItems"/>

    <div class="w-full" v-else>
      <p class="text-center">{{ $t("common.catalog.error.noitems") }}</p>
    </div>

  </MobileOnly>
</template>