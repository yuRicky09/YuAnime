<template>
  <div class="mx-auto max-w-7xl">
    <TheNavigation />
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<script setup>
import TheFooter from "@/components/TheFooter.vue";
import TheNavigation from "@/components/TheNavigation.vue";
</script>
