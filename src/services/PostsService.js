import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PostsService
{
    clearPosts()
    {
        AppState.activePosts = [];
    }

    async getByQuery(params)
    {
        this.clearPosts();
        const res = await api.get("api/posts", {params});
        logger.log("getByQuery res", res)
        AppState.activePosts = res.data.posts;
        AppState.currentPage = +(res.data.page.split(" ")[0].substring(1));
        AppState.totalPages = res.data.totalPages;
        AppState.nextPage = res.data.older;
        AppState.previousPage = res.data.newer;
    }

    async create(newPost)
    {
        await api.post("api/posts", newPost);
    }

    async like(id)
    {
        const res = await api.post("api/posts/" + id + "/like", {});
        const index = AppState.activePosts.findIndex(post => post.id === id);
        AppState.activePosts.splice(index, 1, res.data);
    }
}

export const postsService = new PostsService();