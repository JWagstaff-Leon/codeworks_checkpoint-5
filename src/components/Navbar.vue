<template>
  <nav class="row navbar navbar-expand-lg px-3">
    <div class="container-fluid">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
            <h4 class="text-dark">The Network</h4>
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
