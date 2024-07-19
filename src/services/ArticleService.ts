import axios from "axios";
import { apiBaseUrl, devBaseUrl } from "../constants";
import { ArticleListResponse } from "../types";

const getArticles = async (): Promise<ArticleListResponse> => {
    const response = await axios.get(`${devBaseUrl}v1/article/articles/`);
    return { articles_list: response.data.response };
}

const getArticlesById = async (id: number) => {
    const response = await axios.get(`${devBaseUrl}v1/article/articles/${id}/`);
    return response.data.response;
}

export default {
    getArticles,
    getArticlesById
}