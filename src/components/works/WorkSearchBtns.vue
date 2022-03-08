<template>
  <div class="space-x-4">
    <button class="btn-3d" @click="getWorks(prevSeason)">前期アニメ</button>
    <button class="btn-3d" @click="getWorks(currentSeason)">今期アニメ</button>
    <button class="btn-3d" @click="getWorks(nextSeason)">来期アニメ</button>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useWorkStore } from "@/store/workStore";
import { useRouter } from "vue-router";

const currentSeason = inject("currentSeason");
const nextSeason = get("nextSeason", currentSeason);
const prevSeason = get("prevSeason", currentSeason);
const router = useRouter();

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

function getWorks(season) {
  console.log(router);
  router.push({ name: "Works" });
  workStore.getWorks({ filter_season: season });
}
</script>
