<template>
    <main class="container-fluid">
        <div class="row">
            <div class="col-2">
                <UserSidebar />
            </div>
            <div class="col-10">
                <Navbar />
                <div class="row">
                    <div class="col-10">
                        <router-view />
                    </div>
                    <div class="col-2">
                        <Ads />
                    </div>
                </div>
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
