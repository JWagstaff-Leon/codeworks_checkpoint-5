<template>
    <div class="position-relative py-2 mx-5 my-3 border border-dark rounded shadow">
        <!-- post header -->
        <div class="row mt-1">
            <!-- Profile picture -->
            <div class="col-12">
                <div class="d-flex ps-2">
                    <img :src="post.creator.picture" class="rounded-circle profile-pic" />

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
        <div class="row mt-3 mb-4">
            <div class="col-12">
                <p class="ps-2 pe-4">{{post.body}}</p>
                <div class="d-flex justify-content-center" v-if="post.imgUrl">
                    <img :src="post.imgUrl" class="img-fluid" />
                </div>
            </div>
        </div>

        <!-- Delete ellipsis -->
        <div class="post-menu-button" v-if="post.creatorId === account.id">
            <i class="mdi mdi-dots-horizontal"></i>
        </div>

        <!-- Like button -->
        <div class="like-button selectable" v-if="user.isAuthenticated" @click="likePost">
            <i v-if="!post.likeIds.includes(account.id)" class="mdi mdi-heart-outline"></i>
            <i v-else class="mdi mdi-heart"></i>
            <span>{{ post.likes.length }}</span>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { postsService } from '../services/PostsService.js'
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

    setup(props)
    {
        return {
            account: computed(() => AppState.account),
            user: computed(() => AppState.user),
            async likePost()
            {
                try
                {
                    await postsService.like(props.post.id);
                }
                catch(error)
                {
                    logger.error("[Post.vue > likePost]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.profile-pic
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
    bottom: 5px;
    right: 10px;
}
</style>