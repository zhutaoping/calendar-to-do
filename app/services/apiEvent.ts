import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create();

class APIEvent<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getEvents = async (config?: AxiosRequestConfig) => {
    //* Syntax: get(url[, config])
    const { data } = await axiosInstance.get<T[]>(this.endpoint, config);
    return data;
  };

  getEvent = async (eventId: string, config?: AxiosRequestConfig) => {
    const { data } = await axiosInstance.get<T>(
      `${this.endpoint}/${eventId}`,
      config
    );
    return data;
  };

  createEvent = async (data: Partial<T>, config?: AxiosRequestConfig) => {
    //* Syntax: post(url[, data[, config]])
    const response = await axiosInstance.post<T>(this.endpoint, data, config);
    return response.data;
  };

  completeEvent = async (data: T, config?: AxiosRequestConfig) => {
    const response = await axiosInstance.patch<T>(this.endpoint, data, config);
    return response.data;
  };

  editEvent = async (data: Partial<T>, config?: AxiosRequestConfig) => {
    //* Syntax: patch(url[, data[, config]])
    const response = await axiosInstance.patch<Partial<T>>(
      this.endpoint,
      data,
      config
    );
    return response.data;
  };

  deleteEvent = async (eventId: Partial<T>, config?: AxiosRequestConfig) => {
    //* Delete method doesn't accept a body. Syntax: delete(url[, config])
    const response = await axiosInstance.delete<Partial<T>>(
      `${this.endpoint}/${eventId}`,
      config
    );
    return response.data;
  };
}
export default APIEvent;
