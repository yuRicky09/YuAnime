<template>
  <div>
    <h2 class="my-8 text-center">{{ searchSeason }}のアニメ</h2>
    <ul class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  searchSeason: {
    type: String,
    required: true,
  },
});
</script>
