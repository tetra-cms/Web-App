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
import { ContactItem } from "~/content/contacts/ContactItem";

const { t } = i18n.global;

const categoriesApi = useCategories();
const productsApi = useProducts();

const route = useRoute();

const categoryItems = ref<IItemListItem[]>([
  {
    name: t("category.all"),
    icon: "categories-squares",
    label: t("category.all"),
    route: "",
  }
]);
const productItems = ref<IProductCard[]>([]);
const listOfProducts = ref<IProductCard[]>([]);

const loadingCategories = ref(true);
const loadCategories = async () => {
    loadingCategories.value = true;

    try {
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
                icon: category.icon_url,
                label: category.title,
                route: `?category=${category.id}`,
            })),
        ];
    }
    finally {
        loadingCategories.value = false;
    }
};

const search = ref("");
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const loadingProducts = ref(true);
const loadProducts = async (
    categoryId?: number,
    searchText?: string
) => {
    loadingProducts.value = true;

    try {
        const products = await productsApi.getAll(categoryId, searchText);

        productItems.value = products.map(product => ({
            id: String(product.id),
            image: "api/products/image/" + product.id,
            description: product.description,
            name: product.name,
            price: product.price,
            supply_quantum: product.supply_quantum
        }));

        listOfProducts.value = [...productItems.value];
    }
    finally {
        loadingProducts.value = false;
    }
};

const sortChange = async (sort: string) => {
    const sorted = [...productItems.value].sort(
        (a, b) => a.price - b.price
    );

    if (sort === "desc") {
        sorted.reverse();
    }

    listOfProducts.value = sorted;
};

onMounted(async () => {
    await loadCategories();

    await loadProducts(
        route.query.category
            ? Number(route.query.category)
            : undefined,
        search.value
    );
});

watch(
    () => route.query.category,
    async category => {
        await loadProducts(
            category
                ? Number(category)
                : undefined,
            search.value
        );
    }
);

watch(search, value => {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(async () => {
        await loadProducts(
            route.query.category
                ? Number(route.query.category)
                : undefined,
            value
        );
    }, 300);
});
</script>

<template>
  <DesktopOnly>
    <div class="min-h-screen flex flex-col">
        <ContactHeader 
          :contact-general="String(ContactGeneral)" 
          :contact-list="ContactsList" 
          :current-city="String(CurrentCity)"/>
    
        <Header 
            :title="String(CompanyData.title)"
            :subtitle="String(CompanyData.subtitle)"></Header>

        <div class="flex flex-row justify-between px-[60px] mb-[20px]">
          <h1 class="font-druk text-[24px] font-bold">{{ t('product.title') }}</h1>

          <input
            v-model="search"
            class="w-[40%] py-[5px] border-secondary-wrapper-light border-[1px] rounded-[5px]"
            :placeholder="t('common.search') + '...'">

          <SortList @sort-change="sortChange"/>
        </div>
        
        <div class="flex flex-1 flex-row">
            <div class="flex flex-col px-[20px] mr-[20px]">
              <div>
                <h2 class="text-secondary-wrapper-light font-bold">{{ t('common.category') }}</h2>

                <div 
                  v-if="loadingCategories"
                  class="flex flex-col gap-[5px]">
                    <SkeletonAnimation
                      v-for="i in 3"
                      :width="'w-[200px]'"
                      :height="'h-[32px]'"/>
                </div>

                <ItemsList 
                  v-else
                  :items="categoryItems"/>
              </div>
              
              <div
                class="flex flex-col gap-[10px] mt-auto">
                <div>
                  <p class="text-[12pt] font-bold">{{ String(ContactItem.companyName) }}</p>
                  <p class="text-[10pt]">{{ t("labels.itn") }}: <b>{{ ContactItem.itn }}</b></p>
                </div>
                
                <NuxtLink
                  class="text-[10pt]"
                  to="/legal">
                  {{ t('legal.title') }}
                </NuxtLink>
              </div>
            </div>
            

            <ul 
              class="flex w-full flex-wrap h-full"
              v-if="loadingProducts">
                <li
                  v-for="i in 3"
                  :key="i"
                  class="my-[10px] mx-[2px]"
                >
                  <SkeletonAnimation
                    :width="'w-[190px]'"
                    :height="'h-[300px]'"/>
                </li>
            </ul>
            
            <ProductList
                v-else-if="productItems.length"
                :maxElementsPerPage="12"
                :items="listOfProducts" />

            <div
                v-else
                class="w-full">
                <p class="text-center">
                    {{ t("common.catalog.error.noitems") }}
                </p>
            </div>

        </div>
    </div>
  </DesktopOnly>

  <MobileOnly>
    <div class="pb-[100px]">
      <div class="my-[30px]">
        <Header 
          :title="String(CompanyData.title)"
          :subtitle="String(CompanyData.subtitle)"></Header>
      </div>

      <div class="my-[10px] flex justify-center">
        <InputWithReset
          v-model="search"
          :placeholder="t('common.search') + '...'"
          />
      </div>

      <p class="text-[20pt] font-bold">{{ t('common.category') }}</p>

      <ul 
        class="flex w-full items-list justify-center flex-row gap-[5px] overflow-x-auto pl-[250px]"
        v-if="loadingCategories">
          <li
            class="w-[45px] h-[45px]"
            v-for="i in 3">
            <SkeletonAnimation
              :width="'w-full'"
              :height="'h-full'"/>
          </li>
      </ul>

      <ItemsList 
        v-else
        :items="categoryItems"/>

      <ul 
        class="flex w-full flex-wrap h-full"
        v-if="loadingProducts">
          <li
            v-for="i in 3"
            :key="i"
            class="my-[10px] mx-[2px]"
          >
            <SkeletonAnimation
              :width="'w-[180px]'"
              :height="'h-[250px]'"/>
          </li>
      </ul>

      <ProductList
        v-else-if="productItems.length"
        :items="listOfProducts"/>

      <div class="w-full" 
        v-else>
        <p class="text-center">{{ t("common.catalog.error.noitems") }}</p>
      </div>
    </div>
  </MobileOnly>
</template>