import { AppState } from "../AppState.js";

class SearchService
{
    setSearchTerm(term)
    {
        AppState.searchTerm = term;
    }
}

export const searchService = new SearchService();