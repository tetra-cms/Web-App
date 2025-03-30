<script lang="ts" setup>
import CartIcon from "~/assets/svg/cart.svg";
import { useCartStore } from "~/store/cart";

const props = defineProps<{
    id: number,
    price?: number,
    attributes?: string
}>();

const cart = useCartStore();
cart.$state.cartItems = import.meta.client ? JSON.parse(localStorage.getItem("cart") || '[]') : [];

const itemExist: Ref<boolean> = ref(cart.checkItemExisting(props.id));
const emits = defineEmits(['addCartItem']);
function addCartItem()
{
    emits('addCartItem', { id: props.id });
    cart.addItem(props.id);
    itemExist.value = true;
}

function decreaseAmount()
{
    const cartItem = cart.getItem(props.id);

    if (cartItem &&
        cartItem.quantity <= 1)
    {
        itemExist.value = false;
        cart.removeItem(props.id);
    } else {
        cart.decreaseQuantity(props.id);
    }
}
</script>

<template>
    <button 
        v-if="!itemExist"
        @click="addCartItem" 
        :class="'flex flex-row items-center text-center justify-center select-none text-secondary-primary font-semibold p-[5px] rounded-[5px] bg-primary-primary ' + props.attributes">
            <CartIcon class="w-[20px] h-[20px] mr-[5px] [&>*]:fill-secondary-primary"/>
            <p v-if="!price" class="text-[10pt]">{{ $t("buttons.incart") }}</p>
            <p v-else class="text-[10pt]">{{ props.price }} ₽</p>
    </button>

    <div
        v-else
        class="flex flex-row justify-between bg-secondary-secondary p-[5px] rounded-[5px] w-full items-center">
            <button
            class="font-bold text-[16pt] select-none"
            @click="cart.increaseQuantity(props.id)">
                +
            </button>

            <p class="font-bold">
                {{ cart.getItem(props.id)?.quantity }}
            </p>

            <button 
            class="font-bold text-[16pt] select-none"
            @click="decreaseAmount">
                -
            </button>
    </div>
</template>