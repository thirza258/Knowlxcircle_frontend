import axios from "axios";
import { devBaseUrl, apiBaseUrl } from "../constants";
import { CircleListResponse } from "../types";

const PostCircleArticle = async (name: string, description: string) => {
    const response = await axios.post(`${apiBaseUrl}v1/circle/create/`, {
        name: name,
        description: description
    });
    return response.data.response;
}

const GetAllCircles = async () : Promise<CircleListResponse> => {
    const response = await axios.get(`${apiBaseUrl}v1/circle/circles/`);
    return response.data.response;
}

const getCircle = async (id: string) => {
    const response = await axios.get(`${apiBaseUrl}v1/circle/circles/${id}/`);
    return response.data.response;
}

const associate = async (circleId: number, articleId: number) => {
    const response = await axios.post(`${apiBaseUrl}v1/circle/associate/`, {
        circle_id: circleId,
        article_id: articleId
    });
    return response.data;
}

export default {
    PostCircleArticle,
    GetAllCircles,
    getCircle,
    associate
}