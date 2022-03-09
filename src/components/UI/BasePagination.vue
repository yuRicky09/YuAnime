<template>
  <nav class="my-10 flex justify-center gap-4 sm:items-center sm:gap-8">
    <div
      class="flex cursor-pointer items-center rounded-md bg-emerald-500 py-1 px-[10px] transition-colors duration-200 hover:bg-emerald-400"
      :class="{
        '!cursor-not-allowed hover:!bg-emerald-500': currentPage === 1,
      }"
      @click="toSelected(currentPage - 1)"
    >
      <span class="relative -top-[1px] align-middle">&laquo;</span>
    </div>

    <ul class="hidden sm:flex sm:gap-4">
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

    <select
      v-model="mobileSelectedPage"
      class="bg-neutral-800 py-1 px-1 outline-none sm:hidden"
    >
      <option
        v-for="page in mobilePages"
        :key="page"
        :value="page"
        :selected="currentPage === page ? true : false"
      >
        {{ page }}
      </option>
    </select>

    <button
      class="flex cursor-pointer items-center rounded-md bg-emerald-500 py-1 px-[10px] transition-colors duration-200 hover:bg-emerald-400"
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
import { computed, toRefs, ref, watch } from "vue";

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

const mobileSelectedPage = ref(currentPage.value);
const mobilePages = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPage.value; i++) {
    pages.push(i);
  }

  return pages;
});

function toSelected(page) {
  if (
    page < 1 ||
    page > totalPage.value ||
    page === "..." ||
    page === currentPage.value
  )
    return;

  // mobile模式下按上下一頁按紐時，更新完mobileSelectedPage的值就return，callback讓watch來執行防止重複呼叫toSelectedPage
  if (window.innerWidth < 640) {
    mobileSelectedPage.value = page;
    return;
  }

  emit("toSelectedPage", page);
}

watch(mobileSelectedPage, () => {
  emit("toSelectedPage", mobileSelectedPage.value);
});
</script>
