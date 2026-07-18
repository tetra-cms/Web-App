<script lang="ts" setup>
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';

import { ContactItem } from '~/content/contacts/ContactItem';
</script>

<style>
.ymaps3x0--map-container {
    border-radius: 40px;
}
</style>

<template>
    <DesktopOnly>
      <ContactHeader 
          :contact-general="String(ContactGeneral)" 
          :contact-list="ContactsList" 
          :current-city="String(CurrentCity)"/>
        
      <Header 
          :title="String(CompanyData.title)"
          :subtitle="String(CompanyData.subtitle)"></Header>

      <div class="w-full flex lg:h-[70%] h-full items-center justify-center mt-[20px]">
          <div class="flex lg:flex-row flex-col">
              <div>
                  <h1
                      class="text-[48px] font-bold">
                      {{ $t("header.contacts") }}
                  </h1>

                  <div class="flex flex-col">
                      <a class="my-[10px]" :href="'tel:+' + ContactItem.phone?.replace(/[^0-9]/g, '')"><b>{{ ContactItem.phone }}</b></a>
                      <a class="my-[10px]" :href="'mailto:' + ContactItem.email"><b>{{ ContactItem.email }}</b></a>

                      <div class="flex flex-col mt-[20px]">
                          <p>{{ ContactItem.companyName }}</p>
                          <p>{{ $t("labels.itn") }}: {{ ContactItem.itn }}</p>
                          <p>{{ $t("labels.psnsp") }}: {{ ContactItem.psnsp }}</p>

                          <p class="mt-[30px]">{{ ContactItem.companyAddress }}</p>
                      </div>

                      <RouterLink 
                        class="text-primary-primary"  
                        to="/legal">
                        {{ $t("legal.title") }}
                      </RouterLink>

                      <div class="mt-[30px]">
                          <RouterLink to="/">
                              <div
                              class="flex flex-row items-center text-center justify-center select-none text-secondary-primary font-semibold p-[5px] rounded-[5px] bg-primary-primary">
                                  <p class="text-[10pt]">{{ $t("buttons.backincatalog") }}</p>
                              </div>
                          </RouterLink>
                      </div>
                  </div>
              </div>

              <div class="ml-[30px]">
                  <ClientOnly>
                      <div class="w-[500px] h-[500px]">
                        <OpenStreetMap
                          class="rounded-[40px]"
                          :lon="Number(ContactItem.coords?.lat)"
                          :lat="Number(ContactItem.coords?.lon)"
                        />
                      </div>
                  </ClientOnly>
              </div>
          </div>
      </div>
    </DesktopOnly>

    <MobileOnly>
        <div class="flex flex-col pb-[100px]">
          <h1
              class="text-[32px] font-bold">
              {{ $t("header.contacts") }}
          </h1>

          <div class="px-[10px] flex flex-col">
              <a :href="'tel:+' + ContactItem.phone?.replace(/[^0-9]/g, '')"><b>{{ ContactItem.phone }}</b></a>
              <a :href="'mailto:' + ContactItem.email"><b>{{ ContactItem.email }}</b></a>

              <div class="flex flex-col mt-[20px]">
                  <p><b>{{ ContactItem.companyName }}</b></p>
                  <p>{{ $t("labels.itn") }}: <b>{{ ContactItem.itn }}</b></p>
                  <p>{{ $t("labels.psnsp") }}: <b>{{ ContactItem.psnsp }}</b></p>

                  <p class="mt-[20px]">{{ ContactItem.companyAddress }}</p>

                  <RouterLink 
                    class="text-primary-primary"  
                    to="/legal">
                    {{ $t("legal.title") }}
                  </RouterLink>
              </div>

              <div class="mt-[20px] mb-[10px]">
                  <RouterLink to="/">
                      <div
                      class="flex flex-row items-center text-center justify-center select-none text-secondary-primary font-semibold p-[5px] rounded-[5px] bg-primary-primary">
                          <p class="text-[10pt]">{{ $t("buttons.backincatalog") }}</p>
                      </div>
                  </RouterLink>
              </div>
          </div>
          <ClientOnly>
            <div class="w-full h-[400px]">
              <OpenStreetMap
                :lon="Number(ContactItem.coords?.lat)"
                :lat="Number(ContactItem.coords?.lon)"
              />
            </div>
          </ClientOnly>
        </div>
    </MobileOnly>
</template>