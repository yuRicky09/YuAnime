<template>
  <div class="flex gap-4">
    <CalendarIcon class="my-auto hidden cursor-default sm:block" />
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
    <button
      class="btn-3d"
      :class="{
        '!cursor-not-allowed opacity-40': !selectedYear || !selectedSeason,
      }"
      @click="searchSeason"
    >
      搜尋
    </button>
  </div>
</template>

<script setup>
import DropdownMenu from "@/components/UI/DropdownMenu.vue";
import CalendarIcon from "@/assets/images/svg/calendar.svg";
import { ref, inject } from "vue";

const selectedYear = ref("");
const selectedSeason = ref("");
const selectableYear = getSelectableYear();
const selectableSeason = ["冬", "春", "夏", "秋"];

const setSearchSeason = inject("setSearchSeason");

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

function searchSeason() {
  if (!selectedYear.value || !selectedSeason.value) return;

  setSearchSeason(`${selectedYear.value}-${selectedSeason.value}`);
}
</script>
