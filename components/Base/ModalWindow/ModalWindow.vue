<script lang="ts" setup>
const props = defineProps<{
    title: string
}>();

const isOpen = defineModel<boolean>();

useEscKey(() => {
    isOpen.value = false; 
});
</script>

<template>
    <DesktopOnly>
        <transition
            enter-active-class="transition-opacity duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div 
                v-if="isOpen"
                @click="isOpen = !isOpen"
                class="w-full fixed h-[100vh] backdrop-blur-md bg-dark-secondary-primary/70 top-0 left-0 flex items-center justify-center">
            </div>
        </transition>

        <transition
            enter-active-class="transition-opacity duration-200 delay-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen"
                class="fixed m-auto z-40 inset-x-0 inset-y-0 max-w-max max-h-max p-[40px] rounded-lg border-[1px] bg-secondary-primary border-secondary-light">
                <div class="w-full flex justify-between items-center">
                    <p class="text-lg font-bold">{{ title }}</p>
                    <button
                        @click="isOpen = !isOpen"
                        class="px-[7px] rounded-md">
                        <IconCross 
                            class="w-[12px] h-[12px] [&>*]:fill-light-secondary-light dark:[&>*]:fill-light-secondary-primary"/>
                    </button>
                </div>

                <div class="flex flex-col">
                    <slot/>
                </div>
            </div>
        </transition>
    </DesktopOnly>

    <MobileOnly>
        <transition
            enter-active-class="transition-opacity duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div 
                v-if="isOpen"
                @click="isOpen = !isOpen"
                class="w-full fixed h-[100vh] backdrop-blur-md bg-dark-secondary-primary/70 top-0 left-0 flex items-center justify-center">
            </div>
        </transition>

        <transition
            enter-active-class="transition-opacity duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen"
                class="fixed z-40 w-full p-[30px] max-h-max left-0 right-0 bottom-0 rounded-t-3xl bg-secondary-primary">
                <div class="w-full flex justify-between items-center">
                    <p class="text-lg font-bold">{{ title }}</p>
                    <button
                        @click="isOpen = !isOpen"
                        class="px-[7px] rounded-md">
                        <IconCross 
                            class="w-[12px] h-[12px] [&>*]:fill-light-secondary-light dark:[&>*]:fill-light-secondary-primary"/>
                    </button>
                </div>

                <div class="flex flex-col w-full">
                    <slot/>
                </div>
            </div>
        </transition>
    </MobileOnly>
</template>