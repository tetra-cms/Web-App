import type { ApiProductItem } from "~/types/api/ApiProductItem";
import type { CartItem } from "~/types/cart/CartItem";

export const useCartStore = defineStore('cart', () => {
    const cartItems: Ref<Array<CartItem>> = ref([]);

    function saveCartState()
    {
        localStorage.setItem("cart", JSON.stringify(cartItems.value));
    }

    async function fetchProductInfo(productId: number): Promise<ApiProductItem>
    {
        return await $fetch('/product/' + productId, {
            baseURL: useRuntimeConfig().public.baseURL,
            method: 'GET'
        });
    }

    function checkItemExisting(productId: number): boolean
    {
        const item = cartItems.value.find(item => item.productInfo.id === productId);
        if(item?.productInfo.id) {
            return true;
        } else {
            return false;
        }
    }

    function getItem(productId: number) {
        return cartItems.value.find(item => item.productInfo.id === productId);
    }

    async function addItem(productId: number) {
        const exist = checkItemExisting(productId);
        if(exist) {
            const item = cartItems.value.findIndex(item => item.productInfo.id === productId);
            cartItems.value[item].quantity += 1;
        } else {
            const productInfo = await fetchProductInfo(productId);
            cartItems.value.push({
                productInfo: productInfo,
                quantity: 1
            });
        }

        saveCartState();
    }

    function removeItem(productId: number) {
        const item = cartItems.value.findIndex(item => item.productInfo.id === productId);
        cartItems.value.splice(item, 1);

        saveCartState();
    }

    function increaseQuantity(productId: number) {
        const item = cartItems.value.findIndex(item => item.productInfo.id === productId);
        cartItems.value[item].quantity++;

        saveCartState();
    }

    function decreaseQuantity(productId: number) {
        const item = cartItems.value.findIndex(item => item.productInfo.id === productId);
        cartItems.value[item].quantity--;
        
        saveCartState();
    }

    const summary = computed(() => {
        let summary: number = 0;

        cartItems.value.map((item) => {
            summary += item.productInfo.price * item.quantity;
        });

        return summary;
    });

    return {
        cartItems,
        summary,
        getItem,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        checkItemExisting
    }
});