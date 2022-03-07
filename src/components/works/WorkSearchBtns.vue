<template>
  <div class="space-x-4">
    <button class="btn" @click="getWorks({ filter_season: prevSeason })">
      前期アニメ
    </button>
    <button class="btn" @click="getWorks({ filter_season: currentSeason })">
      今期アニメ
    </button>
    <button class="btn" @click="getWorks({ filter_season: nextSeason })">
      来期アニメ
    </button>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useWorkStore } from "@/store/workStore";

const currentSeason = inject("currentSeason");
const nextSeason = get("nextSeason", currentSeason);
const prevSeason = get("prevSeason", currentSeason);

function get(whichSeason, currentSeason) {
  let [year, season] = currentSeason.split("-");
  const seasons = ["winter", "spring", "summer", "autumn"];
  const seasonIndex = seasons.indexOf(season);

  if (whichSeason === "nextSeason") {
    if (seasonIndex === 3) {
      season = seasons[0];
      year += 1;
    } else {
      season = seasons[seasonIndex + 1];
    }
  } else if (whichSeason === "prevSeason") {
    if (seasonIndex === 0) {
      season = seasons.at(-1);
      year -= 1;
    } else {
      season = seasons[seasonIndex - 1];
    }
  }

  return `${year}-${season}`;
}

const workStore = useWorkStore();
const { getWorks } = workStore;
</script>
