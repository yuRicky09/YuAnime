import axios from "axios";

const request = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
  baseURL: "https://api.annict.com/v1",
});

export const useAnnictApi = function () {
  function getWorks(queryObj) {
    return request.get("/works", {
      params: queryObj,
    });
  }

  function getCasts(queryObj) {
    return request.get("/casts", {
      params: queryObj,
    });
  }

  function getStaffs(queryObj) {
    return request.get("/staffs", {
      params: queryObj,
    });
  }

  return { getWorks, getCasts, getStaffs };
};
