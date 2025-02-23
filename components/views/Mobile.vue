<script lang="ts" setup>
import TabBar from '~/components/tabbar/TabBar.vue';
import { TabBarItems } from '~/content/tabbar/TabBarItems';

</script>

<template>
    <div class="w-full h-[100vh]">
      <NuxtPage/>
      <TabBar :elements="TabBarItems"/>
    </div>
</template>