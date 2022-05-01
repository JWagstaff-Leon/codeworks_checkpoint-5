<template>
    <form @submit.prevent="createPost">
        <div class="py-2 mx-5 my-3 border border-dark rounded shadow">
            <!-- TODO touch up the overlapping on this -->
            <div class="d-flex justify-content-between">
                <!-- Profile picture -->
                <div class="ps-2">
                    <router-link :to="{name: 'Profile', params: { id: account.id }}" title="Go to your profile">
                        <img :src="account.picture" class="rounded-circle profile-pic" />
                    </router-link>
                </div>
                <!-- textbox -->
                <div class="d-flex flex-column flex-grow-1 px-2 mx-3">
                    <textarea placeholder="Share what's happening" class="rounded py-1" v-model="newPost.body"></textarea>
                    <h4 v-if="newPost.imgUrl">Image Preview</h4>
                    <img v-if="newPost.imgUrl" :src="newPost.imgUrl" class="img-preview" />
                </div>
                <!-- add photo and post buttons -->
            </div>
            <div class="d-flex justify-content-around mt-3">
                <button class="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#add-photo-modal"><i class="mdi mdi-image-multiple me-1"></i>Photo</button>
                <button class="btn btn-primary" type="submit"><i class="mdi mdi-send me-1"></i>Post</button>
            </div>
        </div>
    </form>
    <Modal id="add-photo-modal">
        <template #modal-header>
            <h2>Add a photo</h2>
        </template>
        <template #modal-body>
            <form @submit.prevent="addImage">
                <div class="d-flex flex-column mx-2">
                    <span class="ps-2 mb-2">Post Image URL</span>
                    <input class="form-control" placeholder="Photo URL" v-model="photoURL" />
                </div>
                <div class="d-flex justify-content-around mt-4">
                    <button type="button" class="btn btn-outline-secondary" @click="hideModal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </template>
    </Modal>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import { Modal } from 'bootstrap';
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
        const photoURL = ref("");
        const account = computed(() => AppState.account);
        const hideModal = () => {
            Modal.getOrCreateInstance(document.getElementById("add-photo-modal")).hide();
            photoURL.value = newPost.value.imgUrl;
        };

        return {
            newPost,
            photoURL,
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
            },

            hideModal,

            addImage()
            {
                newPost.value.imgUrl = photoURL.value;
                hideModal();
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
.img-preview
{
    height: 25vh;
    width: 100%;
    object-fit: cover;
}
</style>