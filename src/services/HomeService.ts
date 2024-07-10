import axios from "axios";
import { apiBaseUrl } from "../constants";
import { HomeResponse, SearchResponse } from "../types";

const getData = async (): Promise<SearchResponse> => {
    const response = await axios.get<HomeResponse>(`${apiBaseUrl}v1/gemini/`);
    return response.data.response;
}

export default {
    getData
}