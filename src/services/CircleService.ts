import api, { unwrap } from "./apiClient";
import type {
    ApiEnvelope,
    ApiMessage,
    CircleListResponse,
    CreateCircleResponse,
    SingleCircleResponse,
} from "../types";

const PostCircleArticle = (
    name: string,
    description: string,
): Promise<CreateCircleResponse> =>
    unwrap(
        api.post<ApiEnvelope<CreateCircleResponse>>("v1/circle/create/", {
            name: name,
            description: description,
        }),
    );

const GetAllCircles = (): Promise<CircleListResponse> =>
    unwrap(api.get<ApiEnvelope<CircleListResponse>>("v1/circle/circles/"));

const getCircle = (id: string): Promise<SingleCircleResponse> =>
    unwrap(api.get<ApiEnvelope<SingleCircleResponse>>(`v1/circle/circles/${id}/`));

/**
 * The associate endpoint answers `{ status, message }` with no `response` key,
 * so this one deliberately returns the envelope instead of unwrapping it -
 * callers check `result.message === "Success"`.
 */
const associate = async (
    circleId: number,
    articleId: number,
): Promise<ApiMessage> => {
    const { data } = await api.post<ApiMessage>("v1/circle/associate/", {
        circle_id: circleId,
        article_id: articleId,
    });
    return data;
};

const CircleService = {
    PostCircleArticle,
    GetAllCircles,
    getCircle,
    associate,
};

export default CircleService;
