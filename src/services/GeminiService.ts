import api, { unwrap } from "./apiClient";
import type {
    ApiEnvelope,
    GeminiResponse,
    PromptDetailResponse,
    PromptResponse,
} from "../types";

const PostGeminiArticle = (queryString: string): Promise<GeminiResponse> =>
    unwrap(
        api.post<ApiEnvelope<GeminiResponse>>("v1/article/gemini/", {
            query: queryString,
        }),
    );

/** Answers with a confirmation string, not an object. */
const deleteGeminiArticle = (id: number): Promise<string> =>
    unwrap(api.delete<ApiEnvelope<string>>(`v1/article/gemini/${id}`));

const getGeminiPrompt = (): Promise<PromptResponse[]> =>
    unwrap(api.get<ApiEnvelope<PromptResponse[]>>("v1/gemini/chat/"));

const postGeminiPrompt = (prompt: string): Promise<PromptResponse> =>
    unwrap(
        api.post<ApiEnvelope<PromptResponse>>("v1/gemini/chat/", {
            chat_query: prompt,
        }),
    );

/**
 * The detail endpoint answers without an `id`, so it is put back from the one
 * that was requested. That keeps every GeminiService prompt result a complete
 * `PromptResponse` instead of making this the odd one out.
 */
const getGeminiPromptDetail = async (id: number): Promise<PromptResponse> => {
    const detail = await unwrap(
        api.get<ApiEnvelope<PromptDetailResponse>>(`v1/gemini/chat/${id}`),
    );
    return { ...detail, id };
};

const GeminiService = {
    PostGeminiArticle,
    deleteGeminiArticle,
    getGeminiPrompt,
    postGeminiPrompt,
    getGeminiPromptDetail,
};

export default GeminiService;
