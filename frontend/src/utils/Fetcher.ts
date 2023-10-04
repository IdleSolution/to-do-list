import axios from "axios";


const api = axios.create()

class Fetcher {
  proxy: string;

  constructor() {
    this.proxy = 'http://localhost:3001';
  }

  fetchData = async <T>(route: string): Promise<T> => {
    try {
      const response = await api.get<T>(`${this.proxy}${route}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  postData = async <T>(
    route: string,
    body: any,
  ): Promise<T> => {
    try {
      const response = await api.post<T>(
        `${this.proxy}${route}`,
        body
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  deleteData = async <T>(route: string): Promise<T> => {
    try {
      const response = await api.delete<T>(`${this.proxy}${route}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  patchData = async <T>(route: string, body: any): Promise<T> => {
    try {
      const response = await api.patch<T>(
        `${this.proxy}${route}`,
        body
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}

const fetcherInstance = new Fetcher();

export default fetcherInstance;
