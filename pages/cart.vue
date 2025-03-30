<script lang="ts" setup>
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';

import { useCartStore } from '~/store/cart';

const { cartItems } = storeToRefs(useCartStore());
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
        <div>
            <ul>
                <li
                    v-for="cartItem in cartItems">
                    <p>{{ cartItem.productInfo.name }}</p>
                </li>
            </ul>
        </div>
    </DesktopOnly>

    <MobileOnly>
        <div>

        </div>
    </MobileOnly>
</template>