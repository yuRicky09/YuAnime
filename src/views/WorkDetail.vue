<template>
  <div>{{ id }}</div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>
