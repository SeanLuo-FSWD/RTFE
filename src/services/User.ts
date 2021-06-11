import BaseHttpService from "./_baseHttpService";
// import queryString from "query-string";

export default class UserService extends BaseHttpService {
  static registerUser(dto: Object) {
    return this.post("user", dto);
  }
}
