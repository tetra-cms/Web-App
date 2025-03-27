import type { CartItem } from "~/types/cart/CartItem";

export const useCartStore = defineStore('cart', async () => {
    const cartItems: Ref<Array<CartItem>> = ref([]); 
        
    function addItem(productId: number) {
        cartItems.value.push();
    }

    function removeItem(productId: number) {

    }

    function increaseQuantity(productId: number) {
        
    }

    function decreaseQuantity(productId: number) {
        
    }

    const summary = computed(() => {
        let summary: number = 0;

        cartItems.value.forEach((item) => {
            summary += item.productInfo.price * item.quantity;
        });
    });

    return {
        cartItems,
        summary,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity
    }
});