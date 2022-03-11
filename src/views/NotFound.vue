<template>
  <div
    class="flex min-h-[80vh] flex-col items-center justify-center gap-10 text-center md:gap-20 lg:gap-32"
  >
    <div class="text-lg md:text-xl lg:text-2xl">
      <p>申し訳ございませんが、お探しのページが見つかりませんでした。</p>
      <p>削除されたか、移動した可能性がございます。</p>
    </div>
    <router-link
      :to="{ name: 'Works', query: { season: currentSeason, page: 1 } }"
      class="btn py-4 px-5 text-2xl"
      >HOME</router-link
    >
  </div>
</template>

<script setup>
import { inject } from "vue";

const currentSeason = inject("currentSeason");
</script>
