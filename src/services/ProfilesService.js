import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class ProfilesService
{
    clearProfile()
    {
        AppState.activeProfile = {};
    }

    clearProfiles()
    {
        AppState.activeProfiles = [];
    }

    async getById(id)
    {
        this.clearProfile();
        const res = await api.get("api/profiles/" + id);
        logger.log(`getProfileById response | id = ${id}]`, res.data);
        AppState.activeProfile = res.data;
    }

    async getByQuery(params = {})
    {
        this.clearProfiles();
        const res = await api.get("api/profiles", { params });
        logger.log("Profiles by query res", res.data);
        AppState.activeProfiles = res.data;
    }

    async edit(data)
    {
        const res = await api.put("account", data);
        logger.log("edit profile res", res.data);
        AppState.activePosts = AppState.activePosts.map(post => {
            if(post.creatorId === res.data.id)
            {
                post.creator = res.data;
            }
            return post;
        });
        AppState.activeProfile = res.data;
        AppState.account = res.data;
    }
}

export const profilesService = new ProfilesService();