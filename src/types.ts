/**
 * Shapes returned by the Knowlxcircle backend.
 *
 * Every endpoint answers with the same envelope; services unwrap it and hand
 * components the payload, so the `*Response` names below are payload types
 * unless the name says "Envelope".
 */

/** `{ status, message, response }` - the envelope every endpoint wraps its payload in. */
export type ApiEnvelope<T> = {
    status: number;
    message: string;
    response: T;
};

/** Endpoints that acknowledge a write without a payload (e.g. circle association). */
/** Payload of `POST v1/circle/associate/`. */
export type CircleAssociation = {
    id: number;
    circle_id: number;
    article_id: number;
    /** false when the article was already in this circle. */
    created: boolean;
};

export type ApiMessage = {
    status: number;
    message: string;
};

/** Payload of `GET`/`POST v1/gemini/`. */
export type SearchResponse = {
    prompt: string;
    response: string;
    created_at: string;
};

/** Full envelope of `GET v1/gemini/` - same payload as {@link SearchResponse}. */
export type HomeResponse = ApiEnvelope<SearchResponse>;

export type ArticleListResponse = {
    articles_list: ArticleResponse[];
}

export type ArticleResponse = {
    id: number;
    title: string;
    author: string;
    created_at: string;
    updated_at: string;
    published: boolean;
    sections: SectionResponse[];
    comments: CommentResponse[];
}

/** Payload of `POST v1/article/gemini/`: an article with sections but no comments. */
export type GeneratedArticle = {
    id: number;
    title: string;
    author: string;
    created_at: string;
    updated_at: string;
    published: boolean;
    sections: SectionResponse[];
}

export type SectionResponse = {
    id: number;
    body: string;
    order: number;
    /** Foreign key of the parent article. */
    article: number;
    /** Nullable in the database, so absent on rows created before the column existed. */
    created_at?: string | null;
    updated_at?: string | null;
}

export type CommentResponse = {
    id: number;
    body: string;
    author: string;
    /** Foreign key of the parent article. */
    article: number;
    created_at: string;
    /** Nullable in the database, so absent on rows created before the column existed. */
    updated_at?: string | null;
}

/** Payload of `POST v1/article/title/`. */
export type CreateArticleResponse = {
    id: number;
    title: string;
    author: string;
}

/**
 * Payload of `POST v1/article/section/`.
 * Note `article` is the parent article's *title* here, not its id.
 */
export type SectionMutationResponse = {
    article: string;
    body: string;
    order: number;
}

/** Payload of `PUT v1/article/section/`. */
export type SectionUpdateResponse = SectionMutationResponse & {
    updated_at: string;
}

export type CircleListResponse = {
    circles: CircleResponse[];
}

export type CircleResponse = {
    id: number;
    name: string;
    description: string;
    members: number;
    created_at: string;
    updated_at: string;
    sentiment: string;
}

/** Payload of `POST v1/circle/create/`. */
export type CreateCircleResponse = {
    id: number;
    name: string;
}

export type PromptResponse = {
    id: number;
    prompt: string;
    response: string;
    created_at: string;
}

/** Payload of `GET v1/gemini/chat/<id>` - the list shape without its id. */
export type PromptDetailResponse = Omit<PromptResponse, "id">;

export type PromptListResponse = {
    prompts: PromptResponse[];
}

export type ArticleDashboard = {
    id: number;
    title: string;
    description: string;
    count_view: number;
    sentiment: string;
}

export type ArticleDashboardListResponse = {
    articles: ArticleDashboard[];
    explain: string;
    recommendation: string;
    views: number;
    sentiment: string;
    count: number;
}

export type ArticleSearchResponse = {
    id: number;
    title: string;
}

export type SimpleArticleResponse = {
    id: number;
    title: string;
}

export type SingleCircleResponse = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    article: SimpleArticleResponse[];
}

/** Payload of `POST v1/auth/login/`. */
export type LoginResponse = {
    access: string;
    refresh: string;
}

/**
 * `POST v1/auth/register-member/` returns the whole envelope: its `response`
 * payload is not stably serialised by the backend, so it stays opaque and
 * only `status`/`message` are safe to read.
 */
export type RegisterEnvelope = ApiEnvelope<unknown>;
