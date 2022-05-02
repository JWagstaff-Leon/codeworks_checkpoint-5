import { AppState } from "../AppState.js";

class LoadingService
{
    // TODO make start and done work on ids
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