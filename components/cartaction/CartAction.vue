<script lang="ts" setup>
const props = defineProps<{
    productId: number,
    productPrice: number
}>();
</script>

<template>
    <div class="w-full flex flex-row justify-center fixed bottom-[60px] px-[20px] bg-secondary-secondary">
        <CartButton 
            :id="Number(props.productId)"
            :price="props.productPrice"
            attributes="w-full py-[10px]"/>
    </div>
</template>