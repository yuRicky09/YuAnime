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
import { provide } from "vue";

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const currentSeason = getCurrentSeason(year, month);

function getCurrentSeason(year, month) {
  let season;

  if (month < 4) {
    season = "winter";
  } else if (month < 7) {
    season = "spring";
  } else if (month < 10) {
    season = "summer";
  } else {
    season = "autumn";
  }

  return `${year}-${season}`;
}

provide("currentSeason", currentSeason);
</script>
