import api, { unwrap } from "./apiClient";
import type {
    ApiEnvelope,
    GeneratedArticle,
    PromptDetailResponse,
    PromptResponse,
} from "../types";

/**
 * Calls the backend's model-backed endpoints. The model is served through
 * OpenRouter and chosen server-side with OPENROUTER_MODEL, so nothing here
 * names a specific provider.
 *
 * The `v1/gemini/...` paths are the backend's historical URL namespace and are
 * deliberately unchanged - renaming them would be an API break for anything
 * else already pointing at this service.
 */

const postArticle = (queryString: string): Promise<GeneratedArticle> =>
    unwrap(
        api.post<ApiEnvelope<GeneratedArticle>>("v1/article/gemini/", {
            query: queryString,
        }),
    );

/** Answers with a confirmation string, not an object. */
const deleteArticle = (id: number): Promise<string> =>
    unwrap(api.delete<ApiEnvelope<string>>(`v1/article/gemini/${id}`));

const getPrompts = (): Promise<PromptResponse[]> =>
    unwrap(api.get<ApiEnvelope<PromptResponse[]>>("v1/gemini/chat/"));

const postPrompt = (prompt: string): Promise<PromptResponse> =>
    unwrap(
        api.post<ApiEnvelope<PromptResponse>>("v1/gemini/chat/", {
            chat_query: prompt,
        }),
    );

/**
 * The detail endpoint answers without an `id`, so it is put back from the one
 * that was requested. That keeps every prompt result a complete
 * `PromptResponse` instead of making this the odd one out.
 */
const getPromptDetail = async (id: number): Promise<PromptResponse> => {
    const detail = await unwrap(
        api.get<ApiEnvelope<PromptDetailResponse>>(`v1/gemini/chat/${id}`),
    );
    return { ...detail, id };
};

const OpenRouterService = {
    postArticle,
    deleteArticle,
    getPrompts,
    postPrompt,
    getPromptDetail,
};

export default OpenRouterService;
