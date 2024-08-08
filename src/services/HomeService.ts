import axios from "axios";
import { apiBaseUrl, devBaseUrl } from "../constants";
import { HomeResponse, SearchResponse } from "../types";

const getData = async (): Promise<SearchResponse> => {
    const response = await axios.get<HomeResponse>(`${apiBaseUrl}v1/gemini/`);
    return response.data.response;
}

const searchGemini = async (query: string): Promise<SearchResponse> => {
    const payload = {
        "search_query": query
    };

    const response = await axios.post<SearchResponse>(`${apiBaseUrl}v1/gemini/`, payload);
    return response.data;
}

export default {
    getData,
    searchGemini
}