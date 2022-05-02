<template>
    <Loading v-if="loading > 0" />
    <div v-else class="me-lg-5 pe-lg-5 fade-in">
        <CreatePost v-if="user.isAuthenticated" />
        <Thread />
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js'
import { postsService } from "../services/PostsService.js";
import Pop from '../utils/Pop.js'
import { adsService } from '../services/AdsService.js'
import { loadingService } from '../services/LoadingService.js'
export default {
  name: 'Home',

    setup()
    {
        onMounted(async () =>
        {
            try
            {
                loadingService.start();
                postsService.clearPosts();
                adsService.clearAds();
                await adsService.getAds();
                await postsService.getByQuery();
                loadingService.done();
            }
                catch(error)
            {
                logger.error("[HomePage.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        })

      return {
          user: computed(() => AppState.user),
          loading: computed(() => AppState.loading)
      }
  }
}
</script>

<style scoped lang="scss">

</style>
