<template>
  <span class="navbar-text">
    <button
      class="btn selectable text-uppercase my-0 my-lg-0"
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>

    <div class="dropdown my-0 my-lg-0" v-else>
        <div
            class="dropdown-toggle selectable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="authDropdown"
        >
            <div class="p-2">
                <span class="me-3 d-none d-lg-inline">Account Options</span>
                <div v-if="account.picture" class="d-inline d-lg-none">
                    <img
                        :src="account.picture"
                        alt="account photo"
                        height="40"
                        class="rounded-circle"
                    />
                </div>
            </div>
      </div>
      <div
        class="dropdown-menu p-0 list-group w-100"
        aria-labelledby="authDropdown"
      >
        <router-link :to="{ name: 'Profile', params: {id: account.id}}">
            <div class="list-group-item list-group-item-action hoverable">
                My Profile
            </div>
        </router-link>
        <div
          class="list-group-item list-group-item-action hoverable text-danger"
          @click="logout"
        >
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div>
  </span>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
</style>
