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

const postArticleTitle = async (title: string) => {
    const response = await axios.post(`${devBaseUrl}v1/article/title/`, {
        title: title,
        author: "Gemini API",
        published: true
    });
    return response.data.response;
}

const postSection = async (articleId: number, body: string, order: number) => {
    const response = await axios.post(`${devBaseUrl}v1/article/section/`, {
        body: body,
        order: order,
        article_id: articleId
    });
    return response.data.response;
}


export default {
    getArticles,
    getArticlesById,
    postArticleTitle, 
    postSection
}