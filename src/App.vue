<template>
  <div class="xs:px-6 mx-auto max-w-7xl px-2 sm:px-10 md:px-14 lg:px-16">
    <TheNavigation />
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<script setup>
import TheFooter from "@/components/TheFooter.vue";
import TheNavigation from "@/components/TheNavigation.vue";
</script>
