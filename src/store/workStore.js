import { defineStore, acceptHMRUpdate } from "pinia";
import { useAnnictApi } from "@/composables/useAnnictApi";
import { useToast } from "vue-toastification";
import { useWorkImageUrl } from "@/composables/useWorkImageUrl";

const annictApi = useAnnictApi();
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

        const { data } = await annictApi.getWorks({
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
        // 防止是透過直接於url輸入id而非透過連結跳轉時，因store內未有存取資料而直接判斷無此作品，故多加一步驟向db抓資料
        if (!this.work) {
          const { data } = await annictApi.getWorks({ filter_ids: id });
          if (!data.works[0]) {
            this.router.push({ name: "Works" });
            return;
          }
          this.work = data.works[0];
        }

        document.title = this.work.title;
        this.workImageUrl = getWorkImageUrl(this.work);

        const castsPromise = annictApi.getCasts({
          filter_work_id: id,
        });
        const staffsPromise = annictApi.getStaffs({
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
        console.error(err.message);
        toast.error(
          "エラーが発生しました。しばらくしてからもう一度お試しください。"
        );
      } finally {
        this.isLoading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWorkStore, import.meta.hot));
}
