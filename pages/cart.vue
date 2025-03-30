<script lang="ts" setup>
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';

import { pluralizeWord } from '~/utils/PluralizeWord';

import { useCartStore } from '~/store/cart';

const cart = useCartStore();
const { cartItems } = storeToRefs(cart);
cartItems.value = !import.meta.client || JSON.parse(localStorage.getItem("cart") || '[]');
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
    </DesktopOnly>
    
    <DesktopOnly>
        <div class="flex flex-row">
            <ul>
                <li
                    v-for="cartItem in cartItems">
                    <p>{{ cartItem.productInfo.name }}</p>
                </li>
            </ul>

            <div 
                class="w-[200px] py-[40px] bg-secondary-secondary px-[15px] rounded-[10px]">

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
                
                <Button
                    :label="$t('buttons.placeorder')"
                    attributes="w-full py-[10px]"
                    />
            </div>
        </div>

    </DesktopOnly>

    <MobileOnly>
        <div>

        </div>
    </MobileOnly>
</template>