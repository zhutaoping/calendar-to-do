import axios, { AxiosRequestConfig } from "axios";

// export interface FetchResponse<T> {
//   count: number;
//   next: string | null;
//   results: T[];
// }

const axiosInstance = axios.create();

class APIEvent<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getEvents = async (config?: AxiosRequestConfig) => {
    const { data } = await axiosInstance.get<T[]>(this.endpoint, config);
    return data;
  };

  getEvent = async (id: string, config?: AxiosRequestConfig) => {
    const { data } = await axiosInstance.get<T>(
      `${this.endpoint}/${id}`,
      config
    );
    return data;
  };

  createEvent = async (data: Partial<T>, config?: AxiosRequestConfig) => {
    const response = await axiosInstance.post<T>(this.endpoint, data, config);
    return response.data;
  };

  completeEvent = async (data: T, config?: AxiosRequestConfig) => {
    const response = await axiosInstance.patch<T>(this.endpoint, data, config);
    return response.data;
  };
}
export default APIEvent;
