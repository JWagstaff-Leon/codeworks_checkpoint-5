<template>
    <div class="row">
        <div class="col-10">
            <ProfileDetails :profile="profile" />
            <CreatePost v-if="user.isAuthenticated && account.id === profile.id" :query="{creatorId: route.params.id}" />
            <Thread />
        </div>
        <div class="col-2">
            <!-- TODO ad component will go here -->
        </div>
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
export default
{
    setup()
    {
        const route = useRoute();
        onMounted(() => {
            try
            {
                const route = useRoute();
                postsService.clearPosts();
                profilesService.clearProfile();
                profilesService.getProfileById(route.params.id)
                postsService.getByQuery({ creatorId: route.params.id });
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
            profile: computed(() => AppState.activeProfile)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>