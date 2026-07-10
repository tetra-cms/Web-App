<script setup lang="ts">
import { computed } from "vue";

import CartIcon from "~/assets/svg/cart.svg";
import { useCartStore } from "~/stores/cart";

const props = defineProps<{
    id: number;
    price?: number;
    attributes?: string;
}>();

const emit = defineEmits<{
    addCartItem: [{ id: number }];
}>();

const cart = useCartStore();

const cartItem = computed(() =>
    cart.cartItems.find(item => item.productId === props.id)
);

const itemExist = computed(() => !!cartItem.value);

const quantity = computed(() => cartItem.value?.quantity ?? 0);

const addCartItem = () => {
    emit("addCartItem", { id: props.id });

    cart.add(props.id);
};

const increaseAmount = () => {
    cart.increase(props.id);
};

const decreaseAmount = () => {
    cart.decrease(props.id);
};
</script>

<template>
    <button
        v-if="!itemExist"
        @click="addCartItem"
        :class="[
            'flex flex-row items-center justify-center select-none text-secondary-primary font-semibold p-[5px] rounded-[5px] bg-primary-primary',
            attributes
        ]"
    >
        <CartIcon
            class="w-[20px] h-[20px] mr-[5px] [&>*]:fill-secondary-primary"
        />

        <p v-if="price == null" class="text-[10pt]">
            {{ $t("buttons.incart") }}
        </p>

        <p v-else class="text-[10pt]">
            {{ price }} ₽
        </p>
    </button>

    <div
        v-else
        class="flex flex-row justify-between items-center w-full bg-secondary-secondary p-[5px] rounded-[5px]"
    >
        <button
            class="font-bold text-[16pt] select-none"
            @click="increaseAmount"
        >
            +
        </button>

        <p class="font-bold">
            {{ quantity }}
        </p>

        <button
            class="font-bold text-[16pt] select-none"
            @click="decreaseAmount"
        >
            -
        </button>
    </div>
</template>