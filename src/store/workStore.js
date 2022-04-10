import { defineStore, acceptHMRUpdate } from "pinia";
import { useToast } from "vue-toastification";
import { useWorkImageUrl } from "@/composables/useWorkImageUrl";
import api from "@/apis";

const toast = useToast();
const { getWorkImageUrl } = useWorkImageUrl();

export const useWorkStore = defineStore("workStore", {
  state: () => {
    return {
      works: [],
      work: null,
      workImageUrl: null,
      casts: [],
      staffs: [],
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

        const { data } = await api.getWorks({
          sort_watchers_count: "desc",
          per_page: this.workPerPage,
          ...queryObj,
        });

        this.works = data.works;
        this.totalCount = data.total_count;
      } catch (err) {
        console.error(err.message);
        toast.error(
          "エラーが発生しました。しばらくしてからもう一度お試しください。"
        );
      } finally {
        this.isLoading = false;
      }
    },
    async getWork(id) {
      try {
        this.isLoading = true;

        this.work = this.works.find((work) => work.id === id);
        // 透過url直接搜尋作品id時，works將不會有任何緩存資料，需向server發起請求尋找作品
        if (!this.work) {
          const { data } = await api.getWorks({ filter_ids: id });
          if (!data.works[0]) {
            this.router.push({ name: "NotFound" });
            return;
          }
          this.work = data.works[0];
        }

        document.title = `${this.work.title} | YuAnime`;
        this.workImageUrl = getWorkImageUrl(this.work);
        await this.getCastsAndStaffs(id);
      } catch (err) {
        console.error(err.message);
        toast.error(
          "エラーが発生しました。しばらくしてからもう一度お試しください。"
        );
      } finally {
        this.isLoading = false;
      }
    },
    async getCastsAndStaffs(id) {
      try {
        const castsPromise = api.getCasts({
          filter_work_id: id,
        });
        const staffsPromise = api.getStaffs({
          filter_work_id: id,
        });
        const [
          {
            data: { casts },
          },
          {
            data: { staffs },
          },
        ] = await Promise.all([castsPromise, staffsPromise]);

        this.casts = casts;
        this.staffs = staffs;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWorkStore, import.meta.hot));
}
