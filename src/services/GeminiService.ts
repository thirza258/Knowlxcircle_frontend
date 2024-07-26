import axios from "axios";
import { GeminiResponse } from "../types";
import { devBaseUrl } from "../constants";

const PostGeminiArticle = async (queryString: string) => {
    const response = await axios.post(`${devBaseUrl}v1/article/gemini/`, {
        query : queryString
    });
    return response.data.response;
}

const deleteGeminiArticle = async (id: number) => {
    const response = await axios.delete(`${devBaseUrl}v1/article/gemini/${id}`);
    return response.data.response;
}

export default {
    PostGeminiArticle,
    deleteGeminiArticle
}