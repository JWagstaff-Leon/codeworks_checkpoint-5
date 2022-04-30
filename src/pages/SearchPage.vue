<template>
    <div class="px-3">
        <!-- TODO profile results will go here -->
        <div class="mt-2" v-if="posts.length > 0">
            <h2>Posts Results</h2>
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
export default
{
    setup()
    {
        onMounted(() =>
        {
            try
            {
                adsService.clearAds();
                adsService.getAds();
            }
            catch(error)
            {
                logger.error("[SearchPage.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        });

        return {
            profiles: computed(() => AppState.activeProfiles),
            posts: computed(() => AppState.activePosts)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>