<template>
    <main class="container-fluid">
        <div class="row">
            <div class="col-3">
                <UserSidebar />
            </div>
            <div class="col-9">
                <Navbar />
                <router-view />
            </div>
        </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
