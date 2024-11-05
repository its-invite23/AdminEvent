import { Component } from "react";
import Api from "./Api";

class Listing extends Component {


  async Dashboard() {
    return Api.get("/user/all");
  }
  async login(data) {
    return Api.post("/user/login", data);
  }

  async userDelete(data) {
    return Api.post("/user/delete", data);
  }

  async userfilter(data) {
    return Api.post("/user/user-filter", data);
  }

  async userupdatedstatus(data) {
    return Api.post("/user/updated_status", data);
  }
  async profile(page, limit) {
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

  async packageGet(page, limit) {
    return Api.get(`/package/package-get?page=${page}&limit=${limit}`);
  }

  async packageGetId(data) {
    return Api.post(`/package/package-get-id`, data);
  }
  async packageDelete(data) {
    return Api.post(`/package/package-delete`, data);
  }

  async contactGet() {
    return Api.get(`/contact/contact-get`);
  }

  async enquiryGet(page, limit) {
    return Api.get(`enquiry/enquiry-get?page=${page}&limit=${limit}`);
  }

  async EnquiryReply(data) {
    return Api.post(`enquiry/enquiry-reply`, data);
  }
  async packageStatus(data) {
    return Api.post(`/package/package-update-status`, data);
  }
  async contactGet(page,limit) {
    return Api.get(`/contact/contact-get?page=${page}&limit=${limit}`);
  }

  async contactreply(data) {
    return Api.post(`/contact/contact-reply`, data);
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