<template>
  <WorkSearch />

  <div v-if="isLoading">
    <WorkList>
      <template #header>
        <h2
          class="my-8 mx-auto h-8 w-56 animate-pulse rounded-xl bg-neutral-600"
        ></h2>
      </template>
      <WorkListItemSkeleton v-for="index in 6" :key="index" />
    </WorkList>
  </div>

  <div
    v-if="!isLoading && works.length === 0"
    class="grid h-[50vh] place-items-center text-2xl"
  >
    情報は見つかりませんでした
  </div>

  <WorkList v-if="!isLoading && works.length > 0">
    <template #header>
      <h2 class="my-8 text-center">{{ works[0].season_name_text }}のアニメ</h2>
    </template>
    <WorkListItem v-for="work in works" :key="work.id" :work="work" />
  </WorkList>

  <BasePagination
    :total-page="totalPage"
    :current-page="searchPage"
    @to-selected-page="toSelected"
  />
</template>

<script setup>
import WorkSearch from "@/components/works/WorkSearch.vue";
import WorkList from "@/components/works/WorkList.vue";
import WorkListItem from "@/components/works/WorkListItem.vue";
import WorkListItemSkeleton from "@/components/works/WorkListItemSkeleton.vue";
import BasePagination from "@/components/UI/BasePagination.vue";
import { useWorkStore } from "@/store/workStore";
import { provide, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
// 提供給快速搜尋按鈕用的currentSeason需要keep不能為響應式
const currentSeason = getCurrentSeason(year, month);
const searchSeason = ref(getSearchSeason());
const searchPage = ref(getSearchPage());

provide("currentSeason", currentSeason);
provide("setSearchSeason", (season) => {
  searchSeason.value = season;
  searchPage.value = 1;
});

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

function getSearchSeason() {
  return route.query.season ? route.query.season : currentSeason;
}

function getSearchPage() {
  const page = +route.query.page;
  return page ? page : 1;
}

const workStore = useWorkStore();
const { works, isLoading, totalPage } = storeToRefs(workStore);

function toSelected(page) {
  searchPage.value = page;
}

// 組件創建時就立即執行，當page or season改變時也要執行callback，fetch新的data
watchEffect(() => {
  router.push({
    name: "Works",
    query: { season: searchSeason.value, page: searchPage.value },
  });
  workStore.getWorks({
    filter_season: searchSeason.value,
    page: searchPage.value,
  });
});
</script>
