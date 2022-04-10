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
    申し訳ございませんが、情報は見つかりませんでした
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
    @to-selected-page="toSelectedPage"
  />
</template>

<script setup>
import WorkSearch from "@/components/works/WorkSearch.vue";
import WorkList from "@/components/works/WorkList.vue";
import WorkListItem from "@/components/works/WorkListItem.vue";
import WorkListItemSkeleton from "@/components/works/WorkListItemSkeleton.vue";
import BasePagination from "@/components/UI/BasePagination.vue";
import { useWorkStore } from "@/store/workStore";
import { inject, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";

const route = useRoute();
const router = useRouter();
// 未有query時都以當前季節搜尋
const currentSeason = inject("currentSeason");
const searchSeason = ref(getSearchSeason());
const searchPage = ref(getSearchPage());

function getSearchSeason() {
  return route.query.season ? route.query.season : currentSeason;
}

function getSearchPage() {
  const page = +route.query.page;
  return page ? page : 1;
}

function toSelectedPage(page) {
  const season = route.query.season || searchSeason.value;
  router.push({ nmae: "Works", query: { season, page } });
}

const workStore = useWorkStore();
const { works, isLoading, totalPage } = storeToRefs(workStore);
// init
workStore.getWorks({
  filter_season: searchSeason.value,
  page: searchPage.value,
});

onBeforeRouteUpdate((to) => {
  searchSeason.value = to.query.season;
  searchPage.value = +to.query.page;

  workStore.getWorks({
    filter_season: searchSeason.value,
    page: searchPage.value,
  });
});
</script>
