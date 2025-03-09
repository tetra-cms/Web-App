<script>
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
    const accessToken = useCookie("access_token");
    accessToken.value = null;

    navigateTo("/");
});
</script>

<template>

</template>