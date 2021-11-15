import http from "@/shared/http-common";

class ApiService {
  getPeople(): Promise<unknown> {
    return http.get("/api/people/");
  }

  getPeopleDetail(oid: string): Promise<unknown> {
    return http.get(`/api/people/${oid}/`);
  }

  getStock(ticker: string): Promise<unknown> {
    return http.get(`/api/${ticker}`);
  }

}

export default new ApiService();
