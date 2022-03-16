<template>
  <Transition
    enter-active-class="animate-pop-up"
    leave-active-class="animate-pop-up-reverse"
  >
    <div
      v-show="isShow"
      class="fixed right-10 bottom-10 z-10 cursor-pointer hover:opacity-80"
      @click="backToTop"
    >
      <BackToTopIcon class="h-10 w-10" />
    </div>
  </Transition>
</template>

<script setup>
import BackToTopIcon from "@/assets/images/svg/chevron-up-circle.svg";
import { ref, onMounted } from "vue";

const isShow = ref(false);

function backToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

onMounted(() => {
  window.addEventListener("scroll", () => {
    isShow.value = document.documentElement.scrollTop > 300 ? true : false;
  });
});
</script>
