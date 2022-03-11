<template>
  <div class="my-8">
    <div v-if="isLoading" class="min-h-screen">
      <BaseSpinner />
    </div>
    <template v-else>
      <div
        class="flex flex-col items-center gap-6 md:flex-row md:justify-center"
      >
        <img
          v-if="workImageUrl"
          :src="workImageUrl"
          alt="Animate Image Cover"
          class="h-56 w-full object-cover md:w-1/2 lg:h-64 xl:h-80 xl:w-3/5"
          @error="workImageUrl = null"
        />
        <div v-else class="flex items-center gap-5 md:mr-10">
          <NoImageIcon class="h-12 w-12" />
          <span class="text-xl font-bold">No Image</span>
        </div>

        <div
          class="flex flex-col items-center gap-5 text-center md:w-1/2 xl:w-2/5"
        >
          <div class="md:order-1">
            <h2 class="text-lg sm:text-xl md:text-2xl">
              {{ work.title }}
            </h2>
            <p class="text-sm">
              {{ work.title_kana }}
            </p>
          </div>
          <div class="space-x-4">
            <BaseTag :text="work.season_name_text" type="season" />
            <BaseTag :text="work.media_text" :type="work.media" />
          </div>
          <div class="flex items-center gap-4 md:order-2">
            <BaseOuterLink text="公式サイト" :href="work.official_site_url">
              <OuterLinkIcon />
            </BaseOuterLink>
            <BaseOuterLink
              text="Twitter"
              :href="`https://twitter.com/${work.twitter_username}`"
              class="text-sky-500"
            >
              <TwitterIcon class="fill-sky-500" />
            </BaseOuterLink>
            <BaseOuterLink
              text="Wikipedia"
              :href="work.wikipedia_url"
              class="!hidden text-slate-400 lg:!inline-flex"
            >
              <WikipediaIcon class="fill-slate-400" />
            </BaseOuterLink>
          </div>
          <div class="order-3 hidden space-x-4 lg:block">
            <span>ハッシュタグ:</span>
            <a
              :href="`https://twitter.com/search?q=%23${work.twitter_hashtag}`"
              target="_blank"
              class="text-sky-500"
              >#{{ work.twitter_hashtag }}</a
            >
          </div>
        </div>
      </div>

      <section class="my-20">
        <CastTable :casts="casts" />
      </section>

      <section class="my-20">
        <StaffTable :staffs="staffs" />
      </section>
    </template>
  </div>
</template>

<script setup>
import { useWorkStore } from "@/store/workStore";
import BaseTag from "@/components/UI/BaseTag.vue";
import BaseOuterLink from "@/components/UI/BaseOuterLink.vue";
import NoImageIcon from "@/assets/images/svg/dizzy.svg";
import OuterLinkIcon from "@/assets/images/svg/link-external.svg";
import TwitterIcon from "@/assets/images/svg/twitter.svg";
import WikipediaIcon from "@/assets/images/svg/wikipedia.svg";
import { storeToRefs } from "pinia";
import CastTable from "@/components/work-detail/CastTable.vue";
import StaffTable from "../components/work-detail/StaffTable.vue";
import { onBeforeUnmount } from "vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const workStore = useWorkStore();
const { work, casts, staffs, isLoading, workImageUrl } = storeToRefs(workStore);
workStore.getWork(Number(props.id));

onBeforeUnmount(() => {
  workStore.$patch({
    work: null,
    casts: null,
    staffs: null,
  });
});
</script>
