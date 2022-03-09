<template>
  <div class="xs:space-x-4">
    <router-link
      class="btn-3d xs:inline-block hidden"
      :to="{ name: 'Works', query: { season: prevSeason, page: 1 } }"
    >
      前期アニメ
    </router-link>
    <router-link
      class="btn-3d"
      :to="{ name: 'Works', query: { season: currentSeason, page: 1 } }"
    >
      今期アニメ
    </router-link>
    <router-link
      class="btn-3d xs:inline-block hidden"
      :to="{ name: 'Works', query: { season: nextSeason, page: 1 } }"
    >
      来期アニメ
    </router-link>
  </div>
</template>

<script setup>
import { inject } from "vue";

const currentSeason = inject("currentSeason");
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
