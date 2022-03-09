import { defineStore, acceptHMRUpdate } from "pinia";
import { useAnnictApi } from "@/composables/useAnnictApi";

const annictApi = useAnnictApi();

export const useWorkStore = defineStore("workStore", {
  state: () => {
    return {
      works: [],
      workPerPage: 24,
      totalCount: null,
      isLoading: false,
    };
  },
  getters: {
    totalPage() {
      return this.totalCount
        ? Math.ceil(this.totalCount / this.workPerPage)
        : 1;
    },
  },
  actions: {
    async getWorks(queryObj) {
      try {
        this.isLoading = true;

        const { data } = await annictApi.getWorks({
          sort_watchers_count: "desc",
          per_page: this.workPerPage,
          ...queryObj,
        });

        this.works = data.works;
        this.totalCount = data.total_count;
      } catch (err) {
        console.error(err.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWorkStore, import.meta.hot));
}
