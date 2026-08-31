import api, { unwrap } from "./apiClient";
import type { ApiEnvelope, SearchResponse } from "../types";

const getData = (): Promise<SearchResponse> =>
    unwrap(api.get<ApiEnvelope<SearchResponse>>("v1/gemini/"));

/**
 * Used to be typed `Promise<SearchResponse>` while returning `response.data`,
 * i.e. the whole `{ status, message, response }` envelope. It now resolves with
 * the payload its type has always promised.
 */
const searchGemini = (query: string): Promise<SearchResponse> =>
    unwrap(
        api.post<ApiEnvelope<SearchResponse>>("v1/gemini/", {
            search_query: query,
        }),
    );

const HomeService = {
    getData,
    searchGemini,
};

export default HomeService;
