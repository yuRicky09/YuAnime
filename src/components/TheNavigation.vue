<template>
  <header class="flex items-center justify-between py-4">
    <div class="flex items-baseline gap-10 text-xl">
      <router-link :to="{ name: 'Works' }" class="hover:opacity-80"
        >YuAnime</router-link
      >
      <ul class="flex items-center gap-5">
        <li class="transition-colors hover:text-emerald-400">
          <router-link :to="{ name: 'Works' }">アニメ</router-link>
        </li>
        <li class="transition-colors hover:text-emerald-400">
          <router-link to="#">声優</router-link>
        </li>
      </ul>
    </div>

    <div class="flex h-8 gap-4">
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
