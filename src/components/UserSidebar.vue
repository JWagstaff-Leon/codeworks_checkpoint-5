<template>
    <div class="bg-light h-100 row flex-column shadow">
        <Login />
        <div v-if="user.isAuthenticated" class="flex-grow-1 d-flex flex-column align-items-center justify-content-center mb-3">
            <div class="d-flex align-items-center justify-content-center position-relative">
                <img :src="profile.picture" class="profile-pic rounded-circle" />
                <div v-if="profile.graduated" class="grad-badge d-flex align-items-center justify-content-center"><i class="text-dark mdi mdi-school mdi-24px"></i></div>
            </div>
            <div class="d-flex flex-column my-3">
                <h4 class="fst-italic">{{ profile.class }}</h4>
                <h3>{{ profile.name }}</h3>
            </div>
            <div v-if="profile.github" class="my-3">
                <a :href="profile.github" target="_blank">
                        <i class="mdi mdi-github mdi-48px text-dark"></i>
                </a>
                <h6 class="fst-italic m-0">({{ profile.github }})</h6>
            </div>
            <div v-if="profile.linkedin" class="my-3">
                <a :href="profile.linkedin" target="_blank">
                    <i class="mdi mdi-linkedin mdi-48px text-dark"></i>
                </a>
                <h6 class="fst-italic m-0">({{ profile.linkedin }})</h6>
            </div>
            <div v-if="profile.resume" class="my-3">
                <a :href="profile.resume" target="_blank">
                    <i class="mdi mdi-file-account-outline mdi-48px text-dark"></i>
                </a>
                <h6 class="fst-italic m-0">({{ profile.resume }})</h6>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
export default
{
    setup()
    {
        return {
            user: computed(() => AppState.user),
            profile: computed(() => AppState.account)
        }
    }
}
</script>

<style lang="scss" scoped>
.profile-pic
{
    height: auto;
    width: 75%;
    object-fit: cover;

    border: 0.2vw solid black;
}
.grad-badge
{
    height: 2.5vw;
    width: 2.5vw;

    position: absolute;
    bottom: 0;
    right: 15%;

    border: 0.18vw solid black;
    border-radius: 50%;
    background-color: white;
}
</style>