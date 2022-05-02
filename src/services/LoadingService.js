import { AppState } from "../AppState.js";

class LoadingService
{
    start()
    {
        AppState.loading = true;
    }

    done()
    {
        AppState.loading = false;
    }
}

export const loadingService = new LoadingService();