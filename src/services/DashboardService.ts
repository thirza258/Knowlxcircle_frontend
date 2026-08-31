import api, { unwrap } from "./apiClient";
import type { ApiEnvelope, ArticleDashboardListResponse } from "../types";

const getData = (): Promise<ArticleDashboardListResponse> =>
    unwrap(api.get<ApiEnvelope<ArticleDashboardListResponse>>("v1/dashboard/get/"));

const DashboardService = {
    getData,
};

export default DashboardService;
