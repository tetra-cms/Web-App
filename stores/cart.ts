import { defineStore } from "pinia";

export interface CartItem {
    productId: number;
    quantity: number;
}

export const useCartStore = defineStore("cart", () => {
    const cartItems = ref<CartItem[]>([]);

    function saveCart() {
        if (!import.meta.client) return;

        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems.value)
        );
    }

    function loadCart() {
        if (!import.meta.client) return;

        const raw = localStorage.getItem("cart");

        if (!raw) {
            cartItems.value = [];
            return;
        }

        try {
            cartItems.value = JSON.parse(raw);
        } catch {
            cartItems.value = [];
            localStorage.removeItem("cart");
        }
    }

    function add(productId: number, quantity = 1) {
        const item = cartItems.value.find(
            item => item.productId === productId
        );

        if (item) {
            item.quantity += quantity;
        } else {
            cartItems.value.push({
                productId,
                quantity,
            });
        }

        saveCart();
    }

    function remove(productId: number) {
        cartItems.value = cartItems.value.filter(
            item => item.productId !== productId
        );

        saveCart();
    }

    function increase(productId: number) {
        const item = cartItems.value.find(
            item => item.productId === productId
        );

        if (!item) return;

        item.quantity++;

        saveCart();
    }

    function decrease(productId: number) {
        const item = cartItems.value.find(
            item => item.productId === productId
        );

        if (!item) return;

        item.quantity--;

        if (item.quantity <= 0) {
            remove(productId);
            return;
        }

        saveCart();
    }

    function clear() {
        cartItems.value = [];

        if (import.meta.client) {
            localStorage.removeItem("cart");
        }
    }

    const amount = computed(() =>
        cartItems.value.reduce(
            (sum, item) => sum + item.quantity,
            0
        )
    );

    return {
        cartItems,
        amount,
        loadCart,
        saveCart,
        add,
        remove,
        increase,
        decrease,
        clear,
    };
});