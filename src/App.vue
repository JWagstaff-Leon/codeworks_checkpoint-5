<template>
    <main class="container-fluid d-flex flex-column">
        <div class="row flex-grow-1">
            <div class="col-3 main-col">
                <UserSidebar />
            </div>
            <div class="col-9 main-col">
                <Navbar />
                <div class="row">
                    <div class="col-8 scroller sub-col">
                        <router-view />
                    </div>
                    <div class="col-4">
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
    max-height: calc(100vh - 56px);
}

.scroller
{
    overflow-y: scroll;
    scrollbar-color: rgb(150, 150, 150) transparent;
    scrollbar-width: thin;
}
</style>
