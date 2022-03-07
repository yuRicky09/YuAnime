<template>
  <div>
    <h2 class="my-8 text-center">{{ searchSeason }}のアニメ</h2>
    <ul>
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
