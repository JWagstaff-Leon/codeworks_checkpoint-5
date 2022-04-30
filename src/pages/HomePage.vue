<template>
    <CreatePost v-if="user.isAuthenticated" />
    <Thread />
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js'
import { postsService } from "../services/PostsService.js";
import Pop from '../utils/Pop.js'
import { adsService } from '../services/AdsService.js'
export default {
  name: 'Home',

    setup()
    {
        onMounted(async () =>
        {
            try
            {
                postsService.clearPosts();
                adsService.clearAds();
                await adsService.getAds();
                await postsService.getByQuery();
            }
                catch(error)
            {
                logger.error("[HomePage.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        })

      return {
          user: computed(() => AppState.user),
      }
  }
}
</script>

<style scoped lang="scss">
</style>
