import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

function _convertDateString(rawDate)
{
    let newDate = new Date(rawDate)
    let newString = "";
    newString += newDate.getDate() + "/";
    newString += (+newDate.getMonth() + 1) + "/";
    newString += newDate.getFullYear();
    newString += " ";
    newString += newDate.toTimeString().substring(0, 5);

    return newString;
}

class PostsService
{
    clearPosts()
    {
        AppState.activePosts = [];
        AppState.totalPages = null;
        // AppState.currentPage = null;
        AppState.newerPage = null;
        AppState.olderPage = null;
    }

    async getByQuery(params)
    {
        this.clearPosts();
        const res = await api.get("api/posts", {params});
        logger.log("getByQuery res", res);
        res.data.posts.forEach(post => post.createdTime = _convertDateString(post.createdAt));
        AppState.activePosts = res.data.posts;
        // AppState.currentPage = +(res.data.page.split(" ")[0].substring(1));
        AppState.totalPages = res.data.totalPages;
        AppState.olderPage = res.data.older;
        AppState.newerPage = res.data.newer;
    }

    async getByURL(url)
    {
        this.clearPosts();
        const res = await api.get(url);
        res.data.posts.forEach(post => post.createdTime = _convertDateString(post.createdAt));
        AppState.activePosts = res.data.posts;
        // AppState.currentPage = +(res.data.page.split(" ")[0].substring(1));
        AppState.totalPages = res.data.totalPages;
        AppState.olderPage = res.data.older;
        AppState.newerPage = res.data.newer;
    }

    async create(newPost)
    {
        await api.post("api/posts", newPost);
    }

    async like(id)
    {
        const res = await api.post("api/posts/" + id + "/like", {});
        const index = AppState.activePosts.findIndex(post => post.id === id);
        res.data.createdTime = _convertDateString(res.data.createdAt);
        AppState.activePosts.splice(index, 1, res.data);
    }

    async deletePost(id)
    {
        const res = api.delete("api/posts/" + id);
        logger.log("deletePost response", res.data);
        const index = AppState.activePosts.findIndex(post => post.id === id);
        AppState.activePosts.splice(index, 1);
    }
}

export const postsService = new PostsService();