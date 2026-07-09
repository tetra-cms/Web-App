<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from "~/content/contactheader/ContactHeaderData";
import { CompanyData } from "~/content/header/HeaderData";

import ContactHeader from "~/components/contactheader/ContactHeader.vue";
import ItemsList from "~/components/itemslist/ItemsList.vue";
import InputWithReset from "~/components/inputs/inputwithreset/InputWithReset.vue";

import { i18n } from "~/plugins/i18n";

import { useCategories } from "~/composables/api/useCategories";
import { useProducts } from "~/composables/api/useProducts";

import type { IItemListItem } from "~/types/ItemListItem";
import type { IProductCard } from "~/types/productcard/ProductCard";

const { t } = i18n.global;

const categoriesApi = useCategories();
const productsApi = useProducts();

const route = useRoute();

const categoryItems = ref<IItemListItem[]>([]);
const productItems = ref<IProductCard[]>([]);
const listOfProducts = ref<IProductCard[]>([]);

const renderProductList = ref(true);

const loadCategories = async () => {
    const categories = await categoriesApi.getAll();

    categoryItems.value = [
        {
            name: t("category.all"),
            icon: "categories-squares",
            label: t("category.all"),
            route: "",
        },
        ...categories.map(category => ({
            name: category.name,
            icon: category.iconUrl,
            label: category.title,
            route: `?category=${category.id}`,
        })),
    ];
};

const loadProducts = async (categoryId?: number) => {
    const products = await productsApi.getAll(categoryId);

    productItems.value = products.map(product => ({
        id: String(product.id),
        image: product.imageUrl,
        description: product.description,
        name: product.name,
        price: product.price,
    }));

    listOfProducts.value = [...productItems.value];
};

const reRenderProductList = async () => {
    renderProductList.value = false;

    await nextTick();

    renderProductList.value = true;
};

const sortChange = async (sort: string) => {
    const sorted = [...productItems.value].sort(
        (a, b) => a.price - b.price
    );

    if (sort === "desc") {
        sorted.reverse();
    }

    listOfProducts.value = sorted;

    await reRenderProductList();
};

await loadCategories();

await loadProducts(
    route.query.category
        ? Number(route.query.category)
        : undefined
);

watch(
    () => route.query.category,
    async category => {
        await loadProducts(
            category
                ? Number(category)
                : undefined
        );

        await reRenderProductList();
    }
);
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
              :items="listOfProducts"/>

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