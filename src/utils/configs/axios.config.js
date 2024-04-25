import axios from "axios";
import { TIMEOUT } from "../constants/axios.constants";

const HTTP_ADMIN_SERVICE = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      timeout: TIMEOUT,
    },
    // .. other options
  });
  
  export default HTTP_ADMIN_SERVICE;