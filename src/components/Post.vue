<template>
    <div class="position-relative pt-2 mx-5 my-5 border border-dark rounded shadow no-select bg-light">
        <!-- post header -->
        <div class="row mt-1">
            <div class="col-12">
                <div class="d-flex ps-3 action" @click="goToProfile(post.creatorId)" :title="'Go to ' + post.creator.name + '\'s Profile'">
                    <!-- Profile picture -->
                    <img :src="post.creator.picture" class="rounded-circle profile-pic" />

                    <!-- Name + time + graduation status-->
                    <div class="ms-4 d-flex flex-column">

                        <!-- Name -->
                        {{ post.creator.name }}

                        <div>
                            <span>{{post.createdTime}}</span>
                            <i v-if="post.creator.graduated" class="mdi mdi-school ms-2"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Post body -->
        <div class="row mt-3">
            <div class="col-12">
                <p class="ps-3 pe-4">{{post.body}}</p>
                <div class="d-flex justify-content-center" v-if="post.imgUrl">
                    <img :src="post.imgUrl" class="img-fluid" />
                </div>
            </div>
        </div>

        <!-- Delete ellipsis -->
        <div class="post-menu-button action" v-if="post.creatorId === account.id">
            <i class="mdi mdi-dots-horizontal" data-bs-toggle="dropdown"></i>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><span class="dropdown-item text-danger" @click="deletePost(post.id)">Delete Post</span></li>
            </ul>
        </div>

        <!-- Like button -->
        <div class="py-3">
            <div class="like-button action" @click="likePost">
                <i v-if="!post.likeIds.includes(account.id)" class="mdi mdi-heart-outline"></i>
                <i v-else class="mdi mdi-heart"></i>
                <span>{{ post.likes.length }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { postsService } from '../services/PostsService.js'
import { useRouter } from 'vue-router'
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
        const router = useRouter();
        const user = computed(() => AppState.user);
        return {
            account: computed(() => AppState.account),
            user,
            async likePost()
            {
                try
                {
                    if(!user.value.isAuthenticated)
                    {
                        throw new Error("You must be logged in to like posts");
                    }
                    await postsService.like(props.post.id);
                }
                catch(error)
                {
                    logger.error("[Post.vue > likePost]", error.message);
                    Pop.toast(error.message, "error");
                }
            },
            goToProfile(id)
            {
                router.push({ name: 'Profile', params: { id }});
            },
            async deletePost(id)
            {
                try
                {
                    if(await Pop.confirm())
                    {
                        postsService.deletePost(id);
                        Pop.toast("Post successfully deleted", "success");
                    }
                }
                catch(error)
                {
                    logger.error("[Post.vue > deletePost]", error.message);
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