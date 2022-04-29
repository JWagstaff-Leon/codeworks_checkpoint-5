<template>
    <div class="position-relative p-2 my-3 border border-dark rounded shadow">
        <!-- post header -->
        <div class="row mt-1">
            <!-- Profile picture -->
            <div class="col-12">
                <div class="d-flex ps-2">
                    <img :src="post.creator.picture" class="rounded-circle" />

                    <!-- Name + time + graduation status-->
                    <div class="ms-4 d-flex flex-column">

                        <!-- Name -->
                        <div class="row">
                            <div class="col-12">
                                {{ post.creator.name }}
                            </div>
                        </div>

                        <span>{{post.createdAt.substring(11, 16)}} - {{ post.createdAt.substring(0, 10).split("-").join("/")}}</span>
                        <i class="mdi mdi-account-school"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Post body -->
        <div class="row mt-3 ps-2 pe-4">
            <p>{{post.body}}</p>
        </div>

        <!-- Delete ellipsis -->
        <div class="post-menu-button" v-if="post.creatorId === account.id">
            <i class="mdi mdi-dots-horizontal"></i>
        </div>

        <!-- Like button -->
        <div class="like-button" v-if="user.isAuthenticated">
            <i class="mdi mdi-heart-outline"></i>
            <span>{{ post.likes.length }}</span>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
export default
{
    props:
    {
        post:
        {
            type: Object,
            required: true
        }
    },

    setup()
    {
        return {
            account: computed(() => AppState.account),
            user: computed(() => AppState.user)
        }
    }
}
</script>

<style lang="scss" scoped>
img
{
    height: 60px;
    width: 60px;
    object-fit: cover;
}

.post-menu-button
{
    position: absolute;
    top: 10px;
    right: 10px;
}

.like-button
{
    position: absolute;
    bottom: 10px;
    right: 10px;
}
</style>