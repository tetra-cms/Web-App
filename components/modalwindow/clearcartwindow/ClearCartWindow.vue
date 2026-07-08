<script lang="ts" setup>
function clearCart() {
    if(import.meta.client)
    {
        localStorage.removeItem("cart");
        window.location.reload();
    }
}
</script>

<template>
    <DesktopOnly>
        <h2 class="text-[24px] text-center font-bold">{{ $t("modal.closewindow.title") }}</h2>
        <p>{{ $t("modal.closewindow.subtitle") }}</p>


        <div class="flex justify-between">
            <button
            @click="clearCart"
            class="w-full my-[10px] mr-[10px] bg-red-500 rounded-lg p-[5px] text-secondary-primary">
                {{ $t("buttons.clear") }}
            </button>

            <button
            class="my-[10px] w-full bg-secondary-light rounded-lg py-[5px]">
                {{ $t("buttons.cancel") }}
            </button>
        </div>
    </DesktopOnly>
    
    <MobileOnly>
        <h2 class="text-[16px] text-center font-bold">{{ $t("modal.closewindow.title") }}</h2>
        <p>{{ $t("modal.closewindow.subtitle") }}</p>

        <button
        @click="clearCart"
        class="w-full my-[10px] bg-red-500 rounded-lg p-[5px] text-secondary-primary">
            {{ $t("buttons.clear") }}
        </button>

        <button
        class="my-[10px] w-full bg-secondary-light rounded-lg py-[5px]">
            {{ $t("buttons.cancel") }}
        </button>
    </MobileOnly>
</template>