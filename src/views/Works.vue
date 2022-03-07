<template>
  <DropdownMenu
    :seleted-year="year"
    :change-year-to="changeYearTo"
    :change-season-to="changeSeasonTo"
  />
  <div v-for="work in works" :key="work.id" class="text-red-600">
    {{ work.title }}
  </div>
</template>

<script setup>
import { useAnnictApi } from "@/composables/useAnnictApi";
import { watchEffect, ref, computed } from "vue";
import DropdownMenu from "@/components/DropdownMenu.vue";

const year = ref(new Date().getFullYear());
const season = ref(getSeason());
const works = ref([]);
const { getWorks } = useAnnictApi();

const filter_season = computed(() => `${year.value}-${season.value}`);

function getSeason() {
  const month = new Date().getMonth() + 1;

  if (month < 4) {
    return "winter";
  } else if (month < 7) {
    return "spring";
  } else if (month < 10) {
    return "summer";
  } else {
    return "autumn";
  }
}

function changeYearTo(selectedYear) {
  year.value = selectedYear;
}

function changeSeasonTo(selectedSeason) {
  switch (selectedSeason) {
    case "春":
      season.value = "spring";
      break;
    case "夏":
      season.value = "summer";
      break;
    case "秋":
      season.value = "autumn";
      break;
    case "冬":
      season.value = "winnter";
      break;
  }
}

watchEffect(async () => {
  const { data } = await getWorks({
    page: 1,
    filter_season: filter_season.value,
  });

  works.value = data.works;
});
</script>
