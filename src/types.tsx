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