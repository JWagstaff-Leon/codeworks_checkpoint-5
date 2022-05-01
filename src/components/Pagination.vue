<template>
    <div v-if="totalPages > 1">
            <div class="d-flex justify-content-around mb-3">
                <h4 v-if="newerPage" class="selectable p-2" @click="changePage()"><i class="mdi mdi-home-circle-outline"></i> Beginning</h4>
                <h4 v-if="newerPage" class="selectable p-2" @click="changePage(newerPage)"><i class="mdi mdi-chevron-left-box-outline"></i> Newer</h4>
                <h4 v-if="olderPage" class="selectable p-2" @click="changePage(olderPage)">Older <i class="mdi mdi-chevron-right-box-outline"></i></h4>
            </div>
        </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
export default
{
    setup()
    {
        return {

            totalPages: computed(() => AppState.totalPages),
            newerPage: computed(() => AppState.newerPage),
            olderPage: computed(() => AppState.olderPage),
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