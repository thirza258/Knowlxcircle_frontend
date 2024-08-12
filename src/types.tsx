export type HomeResponse = {
    status: number;
    message: string;
    response: {
        prompt: string;
        response: string;
        created_at: string;
    };
};

export type SearchResponse = {
    prompt: string;
    response: string;
    created_at: string;
};

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

export type GeminiResponse = {
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
    article: number;
}

export type CommentResponse = {
    id: number;
    body: string;
    article: number;
    created_at: string;
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

export type PromptResponse = {
    id: number;
    prompt: string;
    response: string;
    created_at: string;
}

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