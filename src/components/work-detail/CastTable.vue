<template>
  <div>
    <table class="w-full text-center">
      <caption class="mb-4 text-2xl">
        キャスト CAST
      </caption>
      <thead>
        <tr class="bg-neutral-800 font-semibold">
          <th class="md:1/4 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
            声優名
          </th>
          <th class="hidden md:table-cell">性別</th>
          <th class="hidden lg:table-cell lg:w-1/5 xl:w-1/6">誕生日</th>
          <th class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">担当キャラ</th>
          <th class="hidden sm:table-cell sm:w-1/3 md:w-auto xl:w-1/6">
            Twitter
          </th>
          <th class="hidden xl:table-cell">公式サイト</th>
          <th class="hidden xl:table-cell">Wikipedia</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cast in casts" :key="cast.id" class="odd:bg-neutral-700">
          <td>{{ cast.person.name }}</td>
          <td class="hidden md:table-cell">{{ cast.person.gender_text }}</td>
          <td class="hidden lg:table-cell">{{ cast.person.birthday }}</td>
          <td>{{ cast.character.name }}</td>
          <td class="hidden sm:table-cell">
            <a
              :href="`https://twitter.com/${cast.person.twitter_username}`"
              target="_blank"
              class="transition-colors hover:text-emerald-500"
              >{{ cast.person.twitter_username }}</a
            >
          </td>
          <td class="hidden xl:table-cell">
            <a
              :href="cast.person.url"
              target="_blank"
              class="flex justify-center transition-colors hover:text-emerald-500"
              ><OuterLinkIcon
            /></a>
          </td>
          <td class="hidden xl:table-cell">
            <a
              :href="cast.person.wikipedia_url"
              target="_blank"
              class="flex justify-center transition-colors hover:text-emerald-500"
              ><WikipediaIcon
            /></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import WikipediaIcon from "@/assets/images/svg/wikipedia.svg";
import OuterLinkIcon from "@/assets/images/svg/link-external.svg";

defineProps({
  casts: {
    type: Array,
    required: true,
  },
});
</script>
