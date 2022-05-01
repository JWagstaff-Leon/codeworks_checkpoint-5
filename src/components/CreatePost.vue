<template>
    <form @submit.prevent="createPost">
        <div class="py-2 mx-5 my-3 border border-dark rounded shadow">
            <!-- TODO touch up the overlapping on this -->
            <div class="d-flex justify-content-between">
                <!-- Profile picture -->
                <div class="ps-2">
                    <img :src="account.picture" class="rounded-circle profile-pic" />
                </div>
                <!-- textbox -->
                <textarea placeholder="Share what's happening" class="rounded py-1 px-2 mx-3" v-model="newPost.body"></textarea>
                <!-- add photo and post buttons -->
            </div>
            <div class="d-flex justify-content-around mt-3">
                <button class="btn btn-outline-primary" type="button"><i class="mdi mdi-image-multiple me-1"></i>Photo</button>
                <button class="btn btn-primary" type="submit"><i class="mdi mdi-send me-1"></i>Post</button>
            </div>
        </div>
    </form>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
export default
{
    props:
    {
        query:
        {
            type: Object,
            default: {}
        }
    },

    setup(props)
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
                    await postsService.create(newPost.value);
                    newPost.value = {};
                    Pop.toast("Post successfully created", "success");
                    postsService.getByQuery(props.query);
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