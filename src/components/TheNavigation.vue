<template>
  <header class="flex items-center py-4 sm:justify-between">
    <div
      class="flex flex-1 items-baseline justify-between gap-10 text-xl sm:flex-none sm:justify-start"
    >
      <h1>YuAnime</h1>
      <ul class="flex items-center gap-5">
        <li class="transition-colors hover:text-emerald-400">
          <router-link :to="{ name: 'Works' }">アニメ</router-link>
        </li>
        <li class="transition-colors hover:text-emerald-400">
          <router-link to="#">声優</router-link>
        </li>
      </ul>
    </div>

    <div class="hidden h-8 gap-4 sm:flex">
      <Transition
        enter-active-class="animate-scale-right"
        leave-active-class="animate-scale-right-reverse"
      >
        <input
          v-show="isSearchBarOpen"
          type="text"
          placeholder="作品名や声優名で検索"
          class="origin-right placeholder:text-sm"
        />
      </Transition>
      <SearchIcon
        class="relative top-1 hover:opacity-80"
        @click="isSearchBarOpen = !isSearchBarOpen"
      />
    </div>
  </header>
</template>

<script setup>
import SearchIcon from "@/assets/images/svg/search.svg";
import { ref } from "vue";

const isSearchBarOpen = ref(false);
</script>
