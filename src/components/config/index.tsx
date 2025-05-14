import axios from "axios";

const request = axios.create({
  baseURL: "https://no23.lavina.tech",
});

export default request;
