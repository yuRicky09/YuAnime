<template>
  <nav class="my-10 flex items-center justify-center gap-8">
    <div
      class="flex cursor-pointer items-center rounded-md bg-emerald-500 py-1 px-[10px] transition-colors duration-200 hover:bg-emerald-400"
      :class="{
        '!cursor-not-allowed hover:!bg-emerald-500': currentPage === 1,
      }"
      @click="toSelected(currentPage - 1)"
    >
      <span class="relative -top-[1px] align-middle">&laquo;</span>
    </div>

    <ul class="flex gap-4">
      <li
        v-for="(page, index) in pages"
        :key="index"
        class="rounded-md py-1 px-[10px] transition-colors duration-200"
        :class="[
          page !== '...'
            ? 'cursor-pointer bg-neutral-700 hover:bg-neutral-400'
            : 'cursor-not-allowed',
          { 'bg-emerald-400 hover:!bg-emerald-400': currentPage === page },
        ]"
        @click="toSelected(page)"
      >
        {{ page }}
      </li>
    </ul>

    <button
      class="flex cursor-pointer items-center rounded-md bg-emerald-500 py-1 px-2 transition-colors duration-200 hover:bg-emerald-400"
      :class="{
        '!cursor-not-allowed hover:!bg-emerald-500': currentPage === totalPage,
      }"
      @click="toSelected(currentPage + 1)"
    >
      <span class="relative -top-[1px] align-middle">&raquo;</span>
    </button>
  </nav>
</template>

<script setup>
import { computed, toRefs } from "vue";

const emit = defineEmits(["toSelectedPage"]);

const props = defineProps({
  totalPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const { totalPage, currentPage } = toRefs(props);

const pages = computed(() => {
  if (totalPage.value <= 6) return totalPage.value;

  if (currentPage.value < 3) {
    return [1, 2, 3, 4, "...", totalPage.value];
  }

  if (currentPage.value === 3) {
    return [1, 2, 3, 4, 5, "...", totalPage.value];
  }

  if (currentPage.value + 2 > totalPage.value) {
    return [
      1,
      "...",
      totalPage.value - 3,
      totalPage.value - 2,
      totalPage.value - 1,
      totalPage.value,
    ];
  }

  if (currentPage.value + 2 === totalPage.value) {
    return [
      1,
      "...",
      totalPage.value - 4,
      totalPage.value - 3,
      totalPage.value - 2,
      totalPage.value - 1,
      totalPage.value,
    ];
  }

  return [
    1,
    "...",
    currentPage.value - 2,
    currentPage.value - 1,
    currentPage.value,
    currentPage.value + 1,
    currentPage.value + 2,
    "...",
    totalPage.value,
  ];
});

function toSelected(page) {
  if (
    page < 1 ||
    page > totalPage.value ||
    page === "..." ||
    page === currentPage.value
  )
    return;

  emit("toSelectedPage", page);
}
</script>
