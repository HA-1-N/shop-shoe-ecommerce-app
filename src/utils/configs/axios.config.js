import axios from "axios";
import { TIMEOUT } from "../constants/axios.constants";

const HTTP_SERVICE = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://100.80.23.145:8088/api",
  headers: {
    "Content-Type": "application/json",
    timeout: TIMEOUT,
  },
  // .. other options
});

export default HTTP_SERVICE;
