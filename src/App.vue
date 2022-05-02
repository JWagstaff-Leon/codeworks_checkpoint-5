<template>
    <main class="container-fluid d-flex flex-column">
        <div class="row flex-grow-1">
            <div class="col-2 d-none d-lg-block main-col">
                <UserSidebar />
            </div>
            <div class="col-12 col-lg-10 main-col">
                <Navbar />
                <div class="row">
                    <div class="col-12 col-lg-10 scroller sub-col">
                        <router-view />
                    </div>
                    <div class="col-2 d-none d-lg-block sub-col">
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

.main-col
{
    max-height: 100vh;
}

.sub-col
{
    height: calc(100vh - 62px);
}

.scroller
{
    overflow-y: scroll;
    scrollbar-color: rgb(150, 150, 150) transparent;
    scrollbar-width: thin;
}
</style>
