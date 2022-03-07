<template>
  <div class="">
    <div>
      <img :src="imageUrl" alt="Animate Image Cover" />
    </div>
    <div>
      <p>{{ work.title }}</p>
      <p>{{ work.media_text }}</p>
      <span>声優</span>
      <ul></ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  work: {
    type: Object,
    required: true,
  },
});

const imageUrl =
  props.work.images.recommended_url ||
  props.work.images.facebook.og_image_url ||
  props.work.images.twitter.image_url;
</script>
