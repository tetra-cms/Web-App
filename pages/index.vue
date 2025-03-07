<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';
import { CategoryListItems } from '~/content/categorylist/CategoryListItems';
import { ProductListItems } from '~/content/productlist/ProductListItems';

import ContactHeader from '~/components/contactheader/ContactHeader.vue';
import ItemsList from '~/components/itemslist/ItemsList.vue';

import InputWithReset from '~/components/inputs/inputwithreset/InputWithReset.vue';
import type { IProductCard } from '~/types/productcard/ProductCard';

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
              <ItemsList :items="CategoryListItems"/>
            </div>
            
            <ProductList 
              :maxElementsPerPage="12"
              v-if="renderProductList"
              :items="listOfProducts"/>
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
    <ItemsList :items="CategoryListItems"/>

    <ProductList
    :items="ProductListItems"/>

  </MobileOnly>
</template>