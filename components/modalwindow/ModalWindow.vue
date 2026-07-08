<script lang="ts" setup>
const props = defineProps<{
    show?: boolean
    content?: Component
}>();

const showModal: Ref<boolean> = ref(false);
function handleClickOutside()
{
    showModal.value = !showModal.value;
}
</script>

<template>
    <div 
    v-show="showModal" 
    @click="handleClickOutside" 
    class="w-full h-full top-[0] left-[0] fixed z-[99999]">
        <DesktopOnly>
            <div class="w-full h-full bg-[#000000AA] flex justify-center items-center">
                <div class="absolute bg-secondary-primary rounded-lg flex flex-col p-[20px]">
                    <component :is="props.content"></component>
                </div>
            </div>
        </DesktopOnly>

        <MobileOnly>
            <div class="w-full h-full bg-[#000000AA] flex justify-end items-end">
                <div class="absolute w-full rounded-t-lg bg-secondary-primary p-[10px] flex flex-col justify-center items-center">
                    <hr class="w-[50%] rounded-[50px] h-[10px] bg-secondary-primary">
                    <component :is="props.content"></component>
                </div>
            </div>
        </MobileOnly>
    </div>
</template>