import { defineStore } from "pinia";
import { useAnnictApi } from "@/composables/useAnnictApi";

const annictApi = useAnnictApi();

export const useWorkStore = defineStore("workStore", {
  state: () => {
    return {
      works: [],
      isLoading: false,
    };
  },
  getters: {},
  actions: {
    async getWorks(queryObj) {
      try {
        this.isLoading = true;

        const { data } = await annictApi.getWorks(queryObj);
        this.works = data.works;
      } catch (err) {
        console.error(err.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
