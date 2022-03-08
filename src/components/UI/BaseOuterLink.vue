<template>
  <a
    :href="href"
    target="_blank"
    class="inline-flex items-center gap-2 hover:opacity-80"
  >
    <slot></slot>
    <span>{{ text }}</span>
  </a>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});
</script>
