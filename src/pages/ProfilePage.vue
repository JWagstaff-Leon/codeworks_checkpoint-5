<template>
    <Loading v-if="loading" />
    <div v-else class="fade-in">
        <ProfileDetails :profile="profile" />
        <CreatePost v-if="user.isAuthenticated && account.id === profile.id" :query="{creatorId: route.params.id}" />
        <Thread />
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { onMounted } from "@vue/runtime-core";
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { profilesService } from "../services/ProfilesService.js";
import { useRoute } from 'vue-router';
import { adsService } from '../services/AdsService.js';
import { loadingService } from '../services/LoadingService.js';
export default
{
    setup()
    {
        const route = useRoute();
        onMounted(async () => {
            try
            {
                loadingService.start();
                postsService.clearPosts();
                profilesService.clearProfile();
                adsService.clearAds();
                adsService.getAds();
                await profilesService.getById(route.params.id)
                await postsService.getByQuery({ creatorId: route.params.id });
                loadingService.done();
            }
            catch(error)
            {
                logger.error("[ProfilePage.vue > created]", error.message);
                Pop.toast(error.message, "error");
            }
        });

        return {
            route,
            user: computed(() => AppState.user),
            account: computed(() => AppState.account),
            profile: computed(() => AppState.activeProfile),
            loading: computed(() => AppState.loading)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>