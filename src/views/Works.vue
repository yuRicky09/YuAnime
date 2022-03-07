<template>
  <h1 class="title">アニメ</h1>

  <WorkSearch />

  <div v-if="isLoading">isLoading</div>
  <WorkList
    v-if="!isLoading && works.length > 0"
    :search-season="works[0].season_name_text"
  >
    <WorkListItem v-for="work in works" :key="work.id" :work="work" />
  </WorkList>
</template>

<script setup>
import WorkSearch from "@/components/works/WorkSearch.vue";
import WorkList from "@/components/works/WorkList.vue";
import WorkListItem from "@/components/works/WorkListItem.vue";
import { useWorkStore } from "@/store/workStore";
import { provide } from "vue";
import { storeToRefs } from "pinia";

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const currentSeason = getCurrentSeason(year, month);

provide("currentSeason", currentSeason);

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

const workStore = useWorkStore();
const { works, isLoading } = storeToRefs(workStore);

workStore.getWorks({ filter_season: currentSeason });
</script>
