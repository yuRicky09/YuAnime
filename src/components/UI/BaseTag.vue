<template>
  <div
    class="inline-block rounded py-1 px-2 text-sm"
    :class="[tagColorMap[type]]"
  >
    {{ text }}
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const tagColorMap = {
  tv: "bg-sky-500",
  ova: "bg-violet-500",
  movie: "bg-pink-500",
  web: "bg-amber-500",
  other: "bg-slate-500",
  season: "bg-zinc-500",
};
</script>
