import { Component } from "react";
import Api from "./Api";

class Listing extends Component {
  async signup(data) {
    return Api.post("/user/signup", data);
  }
  async login(data) {
    return Api.post("/user/login", data);
  }

  async profile(page,limit) {
    return Api.get(`/user/profile?page=${page}&limit=${limit}`);
  }
  
  async profileVerify() {
    return Api.get(`/user//profile-token`);
  }

  async packageGet() {
    return Api.get(`/package/package-get`);
  }
  
  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Listing;