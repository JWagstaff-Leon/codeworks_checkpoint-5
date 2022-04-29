import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PostsService
{
    async getByPage(page = 1)
    {
        const res = await api.get("api/posts", { params: page });
        logger.log(`[Posts service getByPage(page=${page})]`, res.data)
        AppState.activePosts = res.data.posts;
        AppState.currentPage = page;
        AppState.totalPages = res.data.totalPages;
    }
}

export const postsService = new PostsService();