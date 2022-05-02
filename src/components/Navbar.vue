<template>
  <nav class="row navbar navbar-expand-lg px-3">
    <div class="container-fluid">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
            <h4 class="text-dark">The Network</h4>
        </div>
        <!-- TODO fix this on mobile -->
        <Login class="d-inline-block d-lg-none" />
        </router-link>
        <Search />
      </div>
  </nav>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
export default {
  setup() {
    return {
        profile: computed(() => AppState.account)
    };
  },
};
</script>

<style scoped>
.navbar
{
    background: linear-gradient(to right, #39C4C6, #BBEBEB);
}

a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.input-group-text
{
    background-color: #f7f5f5 !important;
}
</style>
