import { Component } from "react";
import Api from "./Api";

class Listing extends Component {
  async signup(data) {
    return Api.post("/user/signup", data);
  }
  async login(data) {
    return Api.post("/user/login", data);
  }

  async userDelete(data) {
    return Api.post("/user/delete", data);
  }

  async userupdatedstatus(data) {
    return Api.post("/user/updated_status", data);
  }
  async profile(page,limit) {
    return Api.get(`/user/profile?page=${page}&limit=${limit}`);
  }
  
  async profileVerify() {
    return Api.get(`/user/profile-token`);
  }
  // Package 
  async packageAdd(data) {
    return Api.post(`/package/package-add`, data);
  }
  async packageUpdate(data) {
    return Api.post(`/package/package-update`, data);
  }

  async packageGet() {
    return Api.get(`/package/package-get`);
  }

  async packageGetId(data) {
    return Api.post(`/package/package-get-id`, data);
  }
  async packageDelete(data) {
    return Api.post(`/package/package-delete`, data);
  }
  
 

  async packageStatus(data) {
    return Api.post(`/package/package-update-status`, data);
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