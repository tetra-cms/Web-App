<script lang="ts" setup>

</script>

<template>
    <MobileOnly>
        <div class="p-[20px]">
            <RouterLink 
                v-if="!useCookie('access_token').value"
                to="/auth">
                <p class="w-full py-[10px] text-center font-bold text-[12px] bg-primary-primary hover:bg-primary-secondary transition-all duration-300 rounded-[5px] text-secondary-primary">
                    {{ $t("auth.buttons.login") }}
                </p>
            </RouterLink>
        </div>

        <ul>
            <li></li>
        </ul>
    </MobileOnly>
</template>