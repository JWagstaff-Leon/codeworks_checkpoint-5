<template>
    <div class="px-3">
        <div class="mt-2" v-if="profiles.length > 0">
            <h2>Profile Results</h2>
            <ProfileCard v-for="p in profiles" :key="p.id" :profile="p" />
        </div>
        <hr v-if="profiles.length > 0 && posts.length > 0" class="my-5"/>
        <div class="mt-2" v-if="posts.length > 0">
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
export default
{
    watch:
    {
        searchTerm(newTerm)
        {
            logger.log(newTerm)
            postsService.clearPosts();
            profilesService.clearProfiles();
            postsService.getByQuery({ query: newTerm });
            profilesService.getByQuery({ query: newTerm });
        }
    },

    setup()
    {
        const searchTerm = computed(() => AppState.searchTerm);
        onMounted(() =>
        {
            try
            {
                postsService.clearPosts();
                profilesService.clearProfiles();
                adsService.clearAds();
                adsService.getAds();
                postsService.getByQuery({ query: searchTerm.value });
                profilesService.getByQuery({ query: searchTerm.value });
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
            searchTerm
        }
    }
}
</script>

<style lang="scss" scoped>

</style>