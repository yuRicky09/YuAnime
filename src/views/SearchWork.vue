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
      <h2 class="my-8 text-center">
        <span class="text-emerald-500">{{ searchTitle }}</span
        >の検索結果:{{ totalCount }}件
      </h2>
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
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";

const route = useRoute();
const router = useRouter();
const searchPage = ref(getSearchPage());
const searchTitle = ref(getSearchTitle());

function getSearchPage() {
  return +route.query.page ? +route.query.page : 1;
}

function getSearchTitle() {
  return route.query.title ? route.query.title : " ";
}

function toSelectedPage(page) {
  const title = getSearchTitle();

  router.push({
    nmae: "SearchWork",
    query: { title, page },
  });
}

const workStore = useWorkStore();
const { works, isLoading, totalPage, totalCount } = storeToRefs(workStore);

workStore.getWorks({
  filter_title: searchTitle.value,
  page: searchPage.value,
});

onBeforeRouteUpdate((to) => {
  searchTitle.value = to.query.title;
  searchPage.value = +to.query.page;

  workStore.getWorks({
    filter_title: searchTitle.value,
    page: searchPage.value,
    sort_season: "desc",
  });
});
</script>
