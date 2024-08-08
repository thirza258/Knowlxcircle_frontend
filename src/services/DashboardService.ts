import axios from "axios";
import { apiBaseUrl, devBaseUrl } from "../constants";

const getData = async () => {
    const response = await axios.get(`${apiBaseUrl}v1/dashboard/get/`);
    
    return response.data.response;
}

export default {
    getData
}