import BaseHttpService from "./_baseHttpService";
// import queryString from "query-string";

export default class AuthService extends BaseHttpService {
  static login(dto: Object) {
    return this.post("auth/login", dto);
  }
}
