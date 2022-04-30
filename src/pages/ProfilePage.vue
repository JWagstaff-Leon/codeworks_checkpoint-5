<template>
    <div class="row">
        <div class="col-10">
            <!-- TODO make a profile details component -->
            <CreatePost v-if="account.id === profile.id" />
            <Thread />
        </div>
        <div class="col-2">
            <!-- TODO ad component will go here -->
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { profilesService } from "../services/ProfilesService.js";
import { useRoute } from 'vue-router';
export default
{
    async setup()
    {
        try
        {
            const route = useRoute();
            postsService.clearPosts();
            profilesService.clearProfile();
            await profilesService.getProfileById(route.params.id)
            await postsService.getByQuery({ creatorId: route.params.id });
        }
        catch(error)
        {
            logger.error("[ProfilePage.vue > created]", error.message);
            Pop.toast(error.message, "error");
        }
        return {
            account: computed(() => AppState.account),
            profile: computed(() => AppState.profile)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>