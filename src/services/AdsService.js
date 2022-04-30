import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AdsService
{
    clearAds()
    {
        AppState.ads = [];
    }

    async getAds()
    {
        this.clearAds();
        const res = await api.get("api/ads");
        logger.log("getAds response", res.data);
        AppState.ads = res.data;
    }
}

export const adsService = new AdsService();