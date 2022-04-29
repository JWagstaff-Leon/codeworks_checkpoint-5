<template>
    <div class="py-2 mx-5 my-3 border border-dark rounded shadow">
        <div class="row">
            <!-- Profile picture -->
            <div class="col-2">
                <div class="ps-2">
                    <img :src="account.picture" class="rounded-circle profile-pic" />
                </div>
            </div>
            <div class="col-10">
                <!-- textbox -->
                <form @submit.prevent="createPost" class="pe-4">
                    <div class="row">
                        <div class="col-12">
                            <textarea placeholder="Share what's happening" class="rounded py-1 px-2" v-model="newPost.body"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <!-- add photo and post buttons -->
                        <div class="col-12 d-flex justify-content-between mt-3">
                            <button class="btn btn-outline-primary"><i class="mdi mdi-image-multiple me-1"></i>Photo</button>
                            <button class="btn btn-primary"><i class="mdi mdi-send me-1"></i>Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
export default
{
    setup()
    {
        const newPost = ref({});
        const account = computed(() => AppState.account);
        return {
            newPost,
            account,
            async createPost()
            {
                try
                {
                    newPost.value.creatorId = account.id;
                    await postsService.createPost(newPost.value);
                    newPost.value = {};
                    Pop.toast("Post successfully created", "success");
                    postsService.getByPage();
                }
                catch(error)
                {
                    logger.error("[CreatePost.vue > createPost]", error.message);
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
textarea
{
    resize: none;
    width: 100%;
    background: white;
    border: 2px dashed limegreen;
}
</style>