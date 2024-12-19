import { Component } from "react";
import Api from "./Api";

class Listing extends Component {
  async Dashboard() {
    return Api.get("/common/dashboard");
  }
  async ImageUpload(data) {
    return Api.post("/cloud/upload" , data);
  }
  
  async ImageDelete(data) {
    return Api.post("/package/delete" , data);
  }
  
  async login(data) {
    return Api.post("/user/admin/login", data);
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
  async profile(page, limit ,name) {
    return Api.get(`/user/profile?page=${page}&limit=${limit}&search=${name}`);
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


  async BookingGet(page ,limit ,name) {
    return Api.get(`/booking/booking-get?page=${page}&limit=${limit}&search=${name}`);
  }
  // const [isOpen, setIsOpen] = useState(false);
  async bookingfilter(data) {
    return Api.post("/booking/booking-filter", data);
  }

  async BookingGetID(id) {
    return Api.get(`/booking/getByID/${id}`);
  }

  async paymentgetid(id) {
    return Api.get(`/booking/payment/${id}`);
  }
  async BookingStatus(data) {
    return Api.post(`/booking/booking-status` , data);
  }
  async BookingPriceUpdate(data) {
    return Api.post(`/booking/update-price` , data);
  }

  
  async CurrencyChange(currency) {
    return Api.get(`/currency/get-rate/${currency}` );
  }
  async BookingPayment(data) {
    return Api.post(`/booking/booking-payment` , data);
  }

  async PaymentGet(page ,limit ,name) {
    return Api.get(`/stripe/payment-get?page=${page}&limit=${limit}&search=${name}` );
  }

  async PackageContactGet(id) {
    return Api.get(`/place/get-place-details/${id}` );
  }

  async chartGet() {
    return Api.get(`/common/graph` );
  }

  async SearchData(data) {
    return Api.post(`/common/search` ,data );
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