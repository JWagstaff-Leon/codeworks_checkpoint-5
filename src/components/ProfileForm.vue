<template>
    <form class="d-flex flex-column" @submit.prevent="submitForm">
        <div class="d-flex">
            <div class="d-flex flex-column me-1">
                <span class="ps-2">Name</span>
                <input class="form-control" placeholder="Name" v-model="edit.name" />
            </div>
            <div class="d-flex flex-column mx-1">
                <span class="ps-2">Class</span>
                <input class="form-control" placeholder="Class" v-model="edit.class" />
            </div>
            <div class="d-flex flex-column align-items-center justify-content-around ms-1">
                <span>Graduated?</span>
                <input type="checkbox" v-model="edit.graduated" />
            </div>
        </div>
        <div class="d-flex mt-4">
            <div class="d-flex flex-column me-1">
                <span class="ps-2">Github Link</span>
                <input class="form-control" placeholder="Github Link" v-model="edit.github" />
            </div>
            <div class="d-flex flex-column mx-1">
                <span class="ps-2">LinkedIn Link</span>
                <input class="form-control" placeholder="LinkedIn Link" v-model="edit.linkedin" />
            </div>
            <div class="d-flex flex-column ms-1">
                <span class="ps-2">Resume Link</span>
                <input class="form-control" placeholder="Resume Link" v-model="edit.resume" />
            </div>
        </div>
        <div class="d-flex mt-4">
            <div class="d-flex flex-column me-1">
                <span>Profile Picture URL</span>
                <input class="form-control" placeholder="Profile Picture URL" v-model="edit.picture" />
            </div>
            <div class="d-flex flex-column ms-1">
                <span>Cover Picture URL</span>
                <input class="form-control" placeholder="Cover Picture URL" v-model="edit.coverImg" />
            </div>
        </div>
        <textarea class="form-control mt-4" placeholder="About You" v-model="edit.bio"></textarea>
        <div class="d-flex justify-content-around mt-5">
            <button type="button" class="btn btn-outline-secondary" @click="hideModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit changes</button>
        </div>
    </form>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { Modal } from 'bootstrap';
export default
{
    props:
    {
        profile:
        {
            type: Object,
            required: true
        }
    },

    setup(props)
    {
        const edit = ref({});
        const hideModal = () => {
            Modal.getOrCreateInstance(document.getElementById("edit-profile-modal")).hide();
            edit.value = {...props.profile};
        };

        watchEffect(() =>
        {
            edit.value = {...props.profile};
        })

        return {
            edit,
            async submitForm()
            {
                try
                {
                    await profilesService.edit(edit.value);
                    Pop.toast("Successfully edited profile", "success");
                    hideModal();
                }
                catch(error)
                {
                    logger.error("[ProfileForm.vue > submitForm]", error.message);
                    Pop.toast(error.message, "error");
                }
            },

            hideModal
        }
    }
}
</script>

<style lang="scss" scoped>
textarea
{
    resize: none;
}
</style>