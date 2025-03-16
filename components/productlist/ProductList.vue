<script lang="ts" setup>
import type { IProductCard } from '~/types/productcard/ProductCard';

const props = defineProps<{
    maxElementsPerPage?: Number,
    items: Array<IProductCard>
}>();

const route = useRoute();

let maxPages : number = Math.ceil(props.items.length / Number(props.maxElementsPerPage));
const currentPage : Ref<number> = ref(Number(route.query.page || 1));

let queryParams: { 
    category?: number,
    page?: number
} = {
    category: Number(route.query.category)
};

function navigateToPage(page: number) {
    const sortByCategory = route.query.category;
    if (sortByCategory)
    {
        queryParams.category = Number(route.query.category);
    } else {
        queryParams.category = undefined;
    }
    queryParams.page = page;

    navigateTo({ query: queryParams });
}

if (currentPage.value > maxPages)
{
    currentPage.value = 1;
    navigateToPage(currentPage.value);
}

function getPaginatedData(items: Array<IProductCard>)
{
    let start = (currentPage.value - 1) * Number(props.maxElementsPerPage);
    return items.slice(
        start, 
        start + Number(props.maxElementsPerPage)
    );
}

function increasePage()
{
    if (currentPage.value != maxPages)
    {
        currentPage.value++;
        navigateToPage(currentPage.value);
    }
}

function nagivateToPage(page: number)
{
    navigateToPage(currentPage.value);
    currentPage.value = page;
}

function decreasePage()
{
    if (currentPage.value != 1)
    {
        currentPage.value--;
        navigateToPage(currentPage.value);
    }
}

function correctPageInput()
{
    if (currentPage.value > maxPages)
    {
        currentPage.value = maxPages - 1;   
    } else if (currentPage.value < 1) {
        currentPage.value = 1;
    }

    navigateToPage(currentPage.value);
}
</script>

<template>
    <div class="flex flex-col w-full">
        <ul class="flex w-full flex-wrap h-full">
            <li 
            class="my-[10px] mx-[2px]" 
            v-for="product in props.maxElementsPerPage ? getPaginatedData(props.items) : props.items">
                <ProductCard
                    :id="product.id"
                    :image="product.image" 
                    :name="product.name" 
                    :description="product.description" 
                    :price="product.price" />
            </li>
        </ul>

        <div 
        class="flex flex-row justify-center"
        v-if="props.items.length > Number(props.maxElementsPerPage)">
            <button
            v-if="currentPage != 1"
            @click="decreasePage">
                Предыдущая
            </button>

            <button
            class="w-[32px] h-[32px] m-[8px] bg-secondary-light border-[1px] rounded-md"
            @click="nagivateToPage(currentPage - 1)"
            v-if="currentPage != 1">
                {{ currentPage - 1 }}
            </button>

            <input
            class="w-[32px] h-[32px] m-[8px] text-center bg-primary-primary rounded-md"
            v-if="maxPages != 1"
            type="number" 
            min="1"
            :max="maxPages" 
            @input="correctPageInput"
            v-model="currentPage"
            :placeholder="String(currentPage)">

            <button
            @click="nagivateToPage(currentPage + 1)"
            class="w-[32px] h-[32px] m-[8px] bg-secondary-light border-[1px] rounded-md"
            v-if="currentPage + 1 <= maxPages">
                {{ currentPage + 1 }}
            </button>

            <button
            v-if="currentPage + 1 <= maxPages"
            @click="increasePage">
                Следующая
            </button>
        </div>
    </div>
</template>