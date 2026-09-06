import api, { unwrap } from "./apiClient";
import type {
    ApiEnvelope,
    CircleAssociation,
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
 * Returns the whole envelope rather than unwrapping it: callers check
 * `message === "Success"`, and `response.created` distinguishes a new link from
 * an article that was already in the circle (the endpoint is idempotent now
 * that a UniqueConstraint backs it).
 */
const associate = async (
    circleId: number,
    articleId: number,
): Promise<ApiEnvelope<CircleAssociation>> => {
    const { data } = await api.post<ApiEnvelope<CircleAssociation>>(
        "v1/circle/associate/",
        { circle_id: circleId, article_id: articleId },
    );
    return data;
};

const CircleService = {
    PostCircleArticle,
    GetAllCircles,
    getCircle,
    associate,
};

export default CircleService;
