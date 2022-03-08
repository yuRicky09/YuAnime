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

  <BasePagination
    :total-page="totalPage"
    :current-page="currentPage"
    @to-selected-page="toSelected"
  />
</template>

<script setup>
import WorkSearch from "@/components/works/WorkSearch.vue";
import WorkList from "@/components/works/WorkList.vue";
import WorkListItem from "@/components/works/WorkListItem.vue";
import BasePagination from "@/components/UI/BasePagination.vue";
import { useWorkStore } from "@/store/workStore";
import { provide, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";

const router = useRouter();
const route = useRoute();
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const currentSeason = getCurrentSeason(year, month);
const currentPage = computed(() => {
  const page = +route.query.page;
  return page ? page : 1;
});

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
const { works, isLoading, totalPage } = storeToRefs(workStore);
workStore.setSeason(currentSeason);
workStore.getWorks({ page: currentPage.value });

// 當page改變時執行callback，fetch新的data
function toSelected(page) {
  router.push({ name: "Works", query: { page: page } });
}

onBeforeRouteUpdate((to) => {
  console.log("BeforeRouteUpdate觸發");
  workStore.getWorks({ page: to.query.page });
});
</script>
