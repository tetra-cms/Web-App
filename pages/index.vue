<script setup lang="ts">
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';
import { CategoryListItems } from '~/content/categorylist/CategoryListItems';

import ContactHeader from '~/components/contactheader/ContactHeader.vue';
import ItemsList from '~/components/itemslist/ItemsList.vue';
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
        <div class="flex flex-row px-[60px]">
          <h1 class="font text-[32px] font-bold">Наша продукция</h1>
        </div>
        
        <div>
            <div class="flex flex-col px-[20px]">
              <h2 class="text-secondary-wrapper-light font-bold">Категории</h2>
              <ItemsList :items="CategoryListItems"/>
            </div>
            
            <ul>

            </ul>
        </div>
    </div>
  </DesktopOnly>

  <MobileOnly>
    <ItemsList :items="CategoryListItems"/>
  </MobileOnly>
</template>
