import axios from "axios";
import { server_url } from "../constant/server_url";

export default class BaseHttpService {
  static BASE_URL = server_url;
  _accessToken: null | string = null;

  static async get(endpoint: string) {
    return axios
      .get(`${this.BASE_URL}/${endpoint}`, { withCredentials: true })
      .catch((error) => this._handleHttpError(error));
  }

  static async post(endpoint: string, data = {}) {
    return axios
      .post(`${this.BASE_URL}/${endpoint}`, data, { withCredentials: true })
      .catch((error) => this._handleHttpError(error));
  }

  static async delete(endpoint: string) {
    return axios
      .delete(`${this.BASE_URL}/${endpoint}`)
      .catch((error) => this._handleHttpError(error));
  }

  static async patch(endpoint: string, data = {}) {
    return axios
      .patch(`${this.BASE_URL}/${endpoint}`, data)
      .catch((error) => this._handleHttpError(error));
  }

  static _handleHttpError(error: any) {
    const { statusCode } = error.response.data;
    console.log('vvvvvvvvvvvvvvvvvvv');
    console.log('error');
    console.log(error);
    console.log('error.response');
    console.log(error.response);
    if (statusCode !== 401) {
      throw error;
    } else {
      return this._handle401();
    }
  }

  static _handle401() {
    window.location.hash = "/signin";
  }
}
