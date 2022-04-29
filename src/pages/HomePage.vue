<template>
    <div class="row">
        <div class="col-10">
            <CreatePost v-if="user.isAuthenticated" />
            <!-- TODO thread component go here -->
        </div>
        <div class="col-2">
            <!-- TODO ad component goes here -->
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
export default {
  name: 'Home',

  setup()
  {
      return {
          user: computed(() => AppState.user)
      }
  }
}
</script>

<style scoped lang="scss">
</style>
