<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <div class="container-fluid">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
            Go home
        </div>
        </router-link>
        <Search />
      </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {
    };
  },
};
</script>

<style scoped>
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
