import axios from "axios";
import { TIMEOUT } from "../constants/axios.constants";

const HTTP_SERVICE = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://192.168.1.143:8088/api",
  headers: {
    "Content-Type": "application/json",
    timeout: TIMEOUT,
  },
  // .. other options
});

export default HTTP_SERVICE;
