<template>
  <li class="overflow-hidden rounded-lg bg-neutral-700">
    <router-link
      :to="{ name: 'WorkDetail', params: { id: work.id } }"
      class="flex h-60 items-center justify-center transition-opacity hover:opacity-80"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt="Animate Image Cover"
        class="h-full w-full object-cover"
        @error="imageUrl = null"
      />
      <div v-else class="flex items-center gap-3">
        <NoImageIcon class="h-12 w-12" />
        <span class="text-xl font-bold">No Image</span>
      </div>
    </router-link>

    <div class="flex flex-col gap-5 px-3 py-5">
      <div class="space-x-3">
        <BaseTag
          v-if="work.season_name_text"
          :text="work.season_name_text"
          type="season"
        />
        <BaseTag :text="work.media_text" :type="work.media" />
      </div>

      <div class="space-x-5">
        <BaseOuterLink
          text="公式サイト"
          :href="work.official_site_url"
          class="self-start"
        >
          <OuterLinkIcon />
        </BaseOuterLink>
        <BaseOuterLink
          text="Twitter"
          :href="`https://twitter.com/${work.twitter_username}`"
          class="self-start text-sky-500"
        >
          <TwitterIcon class="fill-sky-500" />
        </BaseOuterLink>
      </div>

      <h3 class="two-line h-14 text-lg">
        <router-link
          :to="{ name: 'WorkDetail', params: { id: work.id } }"
          class="hover:opacity-80"
        >
          {{ work.title }}
        </router-link>
      </h3>
      <router-link
        :to="{ name: 'WorkDetail', params: { id: work.id } }"
        class="btn mt-4 inline-block self-end"
        >More</router-link
      >
    </div>
  </li>
</template>

<script setup>
import NoImageIcon from "@/assets/images/svg/dizzy.svg";
import BaseTag from "@/components/UI/BaseTag.vue";
import BaseOuterLink from "@/components/UI/BaseOuterLink.vue";
import OuterLinkIcon from "@/assets/images/svg/link-external.svg";
import TwitterIcon from "@/assets/images/svg/twitter.svg";
import { ref } from "vue";
import { useWorkImageUrl } from "@/composables/useWorkImageUrl";

const props = defineProps({
  work: {
    type: Object,
    required: true,
  },
});

const { getWorkImageUrl } = useWorkImageUrl();
const imageUrl = ref(getWorkImageUrl(props.work));
</script>
