import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class ProfilesService
{
    clearProfile()
    {
        AppState.activeProfile = {};
    }

    async getProfileById(id)
    {
        this.clearProfile();
        const res = await api.get("api/profiles/" + id);
        logger.log(`getProfileById response | id = ${id}]`, res.data);
        AppState.activeProfile = res.data;
    }
}

export const profilesService = new ProfilesService();