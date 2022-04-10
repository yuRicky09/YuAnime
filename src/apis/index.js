import axios from "axios";

const request = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
  baseURL: "https://api.annict.com/v1",
});

const getWorks = function (queryObj) {
  return request.get("/works", {
    params: queryObj,
  });
};

const getCasts = function (queryObj) {
  return request.get("/casts", {
    params: queryObj,
  });
};

const getStaffs = function (queryObj) {
  return request.get("/staffs", {
    params: queryObj,
  });
};

export default {
  getWorks,
  getCasts,
  getStaffs,
};
