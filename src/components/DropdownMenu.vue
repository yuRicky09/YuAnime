<template>
  <div>
    <ul>
      <li
        v-for="year in selectableYear"
        :key="year"
        @click="changeYearTo(year)"
      >
        {{ year }}
      </li>
    </ul>
    <ul>
      <li
        v-for="season in selectableSeason"
        :key="season"
        @click="changeSeasonTo(season)"
      >
        {{ season }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  seletedYear: {
    type: Number,
    required: true,
  },
  changeYearTo: {
    type: Function,
    required: true,
  },
  changeSeasonTo: {
    type: Function,
    required: true,
  },
});

const selectableYear = [];
const selectableSeason = ["春", "夏", "秋", "冬"];

for (let i = props.seletedYear + 2; i >= 1990; i--) {
  selectableYear.push(i);
}
</script>
