import axios from "axios";
import { TIMEOUT } from "../constants/axios.constants";

const HTTP_SERVICE = axios.create({
  baseURL: "http://100.80.27.5/api",
  headers: {
    "Content-Type": "application/json",
    timeout: TIMEOUT,
  },
  // .. other options
});

export default HTTP_SERVICE;
