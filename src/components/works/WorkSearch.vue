<template>
  <div class="my-8 flex flex-col gap-6 lg:flex-row lg:justify-between">
    <WorkSearchBtns />
    <WorkSearchDatePicker />
  </div>
</template>

<script setup>
import WorkSearchBtns from "@/components/works/WorkSearchBtns.vue";
import WorkSearchDatePicker from "@/components/works/WorkSearchDatePicker.vue";
</script>
