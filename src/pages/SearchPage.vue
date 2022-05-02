<template>
    <Loading v-if="loading"/>
    <div v-else class="px-3 fade-in">
        <div class="mt-2">
            <h2>Profile Results</h2>
            <h1 class="mt-4 ms-2" v-if="profiles.length <= 0">No Profiles Found</h1>
            <ProfileCard v-for="p in profiles" :key="p.id" :profile="p" />
        </div>
        <hr class="my-5"/>
        <div class="mt-2">
            <h2>Post Results</h2>
            <Thread />
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { adsService } from '../services/AdsService.js';
import { AppState } from '../AppState.js';
import { profilesService } from '../services/ProfilesService.js';
import { postsService } from '../services/PostsService.js';
import { loadingService } from '../services/LoadingService.js';
export default
{
    watch:
    {
        async searchTerm(newTerm)
        {
            loadingService.start();
            postsService.clearPosts();
            profilesService.clearProfiles();
            await postsService.getByQuery({ query: newTerm });
            await profilesService.getByQuery({ query: newTerm });
            loadingService.done();
        }
    },

    setup()
    {
        const searchTerm = computed(() => AppState.searchTerm);
        onMounted(async () =>
        {
            try
            {
                loadingService.start();
                postsService.clearPosts();
                profilesService.clearProfiles();
                adsService.clearAds();
                adsService.getAds();
                await postsService.getByQuery({ query: searchTerm.value });
                await profilesService.getByQuery({ query: searchTerm.value });
                loadingService.done();
            }
            catch(error)
            {
                logger.error("[SearchPage.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        });

        return {
            profiles: computed(() => AppState.activeProfiles),
            posts: computed(() => AppState.activePosts),
            loading: computed(() => AppState.loading),
            searchTerm
        }
    }
}
</script>

<style lang="scss" scoped>

</style>