import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  // vue.config.jsのproxyで定義したのでここでは設定しない
  //baseURL: process.env.VUE_APP_BASE_URL,
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json"
  },
});

export default apiClient;
