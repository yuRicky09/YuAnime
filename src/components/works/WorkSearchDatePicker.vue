<template>
  <div class="flex gap-5">
    <CalendarIcon class="my-auto cursor-default" />
    <DropdownMenu
      :options="selectableYear"
      placeholder="年"
      @option-selected="changeYearTo"
    />
    <DropdownMenu
      :options="selectableSeason"
      placeholder="季節"
      @option-selected="changeSeasonTo"
    />
    <button class="btn-3d" @click="getWorks">搜尋</button>
  </div>
</template>

<script setup>
import DropdownMenu from "@/components/UI/DropdownMenu.vue";
import CalendarIcon from "@/assets/images/svg/calendar.svg";
import { ref } from "vue";
import { useWorkStore } from "@/store/workStore";
import { useRouter } from "vue-router";

const selectedYear = ref("");
const selectedSeason = ref("");
const selectableYear = getSelectableYear();
const selectableSeason = ["春", "夏", "秋", "冬"];
const workStore = useWorkStore();
const router = useRouter();

function getSelectableYear() {
  const year = new Date().getFullYear();
  const selectableYear = [];

  for (let i = year + 2; i >= 1990; i--) {
    selectableYear.push(i);
  }

  return selectableYear;
}

function changeYearTo(newYear) {
  selectedYear.value = newYear;
}

function changeSeasonTo(newSeason) {
  switch (newSeason) {
    case "春":
      selectedSeason.value = "spring";
      break;
    case "夏":
      selectedSeason.value = "summer";
      break;
    case "秋":
      selectedSeason.value = "autumn";
      break;
    case "冬":
      selectedSeason.value = "winter";
      break;
  }
}

function getWorks() {
  if (!selectedYear.value || !selectedSeason.value) return;

  workStore.setSeason(`${selectedYear.value}-${selectedSeason.value}`);
  console.log(router);
}
</script>
