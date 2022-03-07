import axios from "axios";

const request = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
  baseURL: "https://api.annict.com/v1",
});

export const useAnnictApi = function () {
  function getWorks(query) {
    return request.get("/works", {
      params: {
        sort_watchers_count: "desc",
        ...query,
      },
    });
  }

  return { getWorks };
};
