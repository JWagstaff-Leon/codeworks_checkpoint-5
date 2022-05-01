<template>
    <div>
        <Post v-for="p in posts" :key="p.id" :post="p" />
        <div v-if="totalPages > 1">
            <div class="d-flex justify-content-around mb-3">
                <h4 v-if="newerPage" class="selectable p-2" @click="changePage(newerPage)"><i class="mdi mdi-chevron-left-box-outline"></i> Newer</h4>
                <h4 v-else></h4>
                <h4 v-if="olderPage" class="selectable p-2" @click="changePage(olderPage)">Older <i class="mdi mdi-chevron-right-box-outline"></i></h4>
                <h4 v-else></h4>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { postsService } from '../services/PostsService.js'
export default
{
    setup()
    {
        
        return {
            posts: computed(() => AppState.activePosts),
            totalPages: computed(() => AppState.totalPages),
            newerPage: computed(() => AppState.newerPage),
            olderPage: computed(() => AppState.olderPage),
            // currentPage: computed(() => AppState.currentPage),
            async changePage(pageURL)
            {
                try
                {
                    await postsService.getByURL(pageURL);
                }
                catch(error)
                {
                    logger.error("[Thread.vue > changePage]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>