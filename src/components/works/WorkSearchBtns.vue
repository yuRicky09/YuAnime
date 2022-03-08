<template>
  <div class="space-x-4">
    <button class="btn-3d" @click="setSearchSeason(prevSeason)">
      前期アニメ
    </button>
    <button class="btn-3d" @click="setSearchSeason(currentSeason)">
      今期アニメ
    </button>
    <button class="btn-3d" @click="setSearchSeason(nextSeason)">
      来期アニメ
    </button>
  </div>
</template>

<script setup>
import { inject } from "vue";

const currentSeason = inject("currentSeason");
const setSearchSeason = inject("setSearchSeason");
const nextSeason = get("nextSeason", currentSeason);
const prevSeason = get("prevSeason", currentSeason);

function get(wantSeason, currentSeason) {
  let [year, season] = currentSeason.split("-");
  const seasons = ["winter", "spring", "summer", "autumn"];
  const seasonIndex = seasons.indexOf(season);

  if (wantSeason === "nextSeason") {
    if (seasonIndex === 3) {
      season = seasons[0];
      year += 1;
    } else {
      season = seasons[seasonIndex + 1];
    }
  } else if (wantSeason === "prevSeason") {
    if (seasonIndex === 0) {
      season = seasons.at(-1);
      year -= 1;
    } else {
      season = seasons[seasonIndex - 1];
    }
  }

  return `${year}-${season}`;
}
</script>
