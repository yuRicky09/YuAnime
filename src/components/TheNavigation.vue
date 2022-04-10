<template>
  <header class="flex items-center py-4 sm:justify-between">
    <div class="text-xl">
      <router-link
        class="transition-colors hover:text-emerald-500"
        :to="{ name: 'Works', query: { season: currentSeason, page: 1 } }"
      >
        <h1>YuAnime</h1>
      </router-link>
    </div>

    <div class="relative z-20 hidden h-8 gap-4 sm:flex">
      <Transition
        enter-active-class="animate-scale-right"
        leave-active-class="animate-scale-right-reverse"
      >
        <input
          v-show="isSearchBarOpen"
          v-model.trim="inputValue"
          type="text"
          placeholder="作品名で検索"
          class="origin-right placeholder:text-sm"
          @keydown.enter="searchWork"
        />
      </Transition>
      <SearchIcon
        class="relative top-1 hover:opacity-80"
        @click="toggleSearchBar"
      />
    </div>
    <BaseOverlay v-show="isOpen" @click="clearAll" />
  </header>
</template>

<script setup>
import SearchIcon from "@/assets/images/svg/search.svg";
import { ref, inject } from "vue";
import BaseOverlay from "@/components/UI/BaseOverlay.vue";
import { useRouter } from "vue-router";

const currentSeason = inject("currentSeason");
const isSearchBarOpen = ref(false);
const isOpen = ref(false);
const inputValue = ref(null);
const router = useRouter();

function toggleSearchBar() {
  if (!isSearchBarOpen.value) {
    isSearchBarOpen.value = true;
    isOpen.value = true;
  } else if (isSearchBarOpen.value) {
    if (inputValue.value) {
      searchWork();
    } else {
      clearAll();
    }
  }
}

function searchWork() {
  router.push({
    name: "SearchWork",
    // 搜尋框未填就按下enter則給予預設值，一次回傳所有動畫資料
    query: { title: inputValue.value || " ", page: 1 },
  });
  clearAll();
}

function clearAll() {
  isSearchBarOpen.value = false;
  isOpen.value = false;
  inputValue.value = null;
}
</script>
