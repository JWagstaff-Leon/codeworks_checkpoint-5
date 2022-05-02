import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
    user: {},
    account: {},

    activeProfile: {},
    activeProfiles: [],
    profileEdit: {},

    activePosts: [],
    totalPages: null,
    newerPage: null,
    olderPage: null,

    ads: [],

    searchTerm: "",

    loading: true
})
