<template>
  <div
    class="xs:w-24 relative flex w-20 cursor-pointer select-none items-center justify-center bg-neutral-600 sm:w-32"
    @click="isOpen = true"
  >
    <span class="block">{{ selectedOption }}</span>
    <Transition
      enter-active-class="animate-scale-top"
      leave-active-class="animate-scale-top-reverse"
    >
      <ul
        v-show="isOpen"
        ref="menu"
        class="absolute top-[calc(100%+5px)] left-0 z-20 max-h-44 w-full origin-top overflow-y-auto bg-inherit py-2 text-center"
      >
        <li
          v-for="option in options"
          :key="option"
          class="py-1 hover:text-emerald-500"
          :class="{ 'text-emerald-500': selectedOption === option }"
          @click.stop="$emit('optionSelected', option), setSelected(option)"
        >
          {{ option }}
        </li>
      </ul>
    </Transition>
  </div>
  <BaseOverlay v-if="isOpen" @click="isOpen = false" />
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";

const BaseOverlay = defineAsyncComponent(() =>
  import("@/components/UI/BaseOverlay.vue")
);

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

defineEmits(["optionSelected"]);

const selectedOption = ref(props.placeholder);
const menu = ref(null);
const isOpen = ref(false);

function setSelected(option) {
  menu.value.scrollTop = 0;
  selectedOption.value = option;
  isOpen.value = false;
}
</script>
