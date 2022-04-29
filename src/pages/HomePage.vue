<template>
    <div class="row">
        <div class="col-10">
            <CreatePost v-if="user.isAuthenticated" />
            <Thread />
        </div>
        <div class="col-2">
            <!-- TODO ad component goes here -->
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js'
import { postsService } from "../services/PostsService.js";
import Pop from '../utils/Pop.js'
export default {
  name: 'Home',

    setup()
    {
        onMounted(async () =>
        {
            try
            {
                await postsService.getByPage();
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
