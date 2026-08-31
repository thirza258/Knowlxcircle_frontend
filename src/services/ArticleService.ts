import api, { unwrap } from "./apiClient";
import type {
    ApiEnvelope,
    ArticleListResponse,
    ArticleResponse,
    CreateArticleResponse,
    SectionMutationResponse,
    SectionUpdateResponse,
} from "../types";

/** `GET v1/article/articles/` answers with a bare array; wrap it for the caller. */
const getArticles = async (): Promise<ArticleListResponse> => {
    const articles = await unwrap(
        api.get<ApiEnvelope<ArticleResponse[]>>("v1/article/articles/"),
    );
    return { articles_list: articles };
};

const getArticlesById = (id: number): Promise<ArticleResponse> =>
    unwrap(api.get<ApiEnvelope<ArticleResponse>>(`v1/article/articles/${id}/`));

const postArticleTitle = (title: string): Promise<CreateArticleResponse> =>
    unwrap(
        api.post<ApiEnvelope<CreateArticleResponse>>("v1/article/title/", {
            title: title,
            author: "Gemini API",
            published: true,
        }),
    );

const postSection = (
    articleId: number,
    body: string,
    order: number,
): Promise<SectionMutationResponse> =>
    unwrap(
        api.post<ApiEnvelope<SectionMutationResponse>>("v1/article/section/", {
            body: body,
            order: order,
            article_id: articleId,
        }),
    );

const EditSection = (
    sectionId: number,
    body: string,
    order: number,
): Promise<SectionUpdateResponse> =>
    unwrap(
        api.put<ApiEnvelope<SectionUpdateResponse>>("v1/article/section/", {
            id: sectionId,
            body: body,
            order: order,
        }),
    );

const ArticleService = {
    getArticles,
    getArticlesById,
    postArticleTitle,
    postSection,
    EditSection,
};

export default ArticleService;
