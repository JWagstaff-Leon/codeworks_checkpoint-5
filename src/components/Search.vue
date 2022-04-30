<template>
    <form @submit.prevent="search">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" v-model="searchTerm" required />
            <button class="btn btn-light" type="submit"><i class="mdi mdi-magnify"></i></button>
        </div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { useRouter } from 'vue-router';
import { profilesService } from '../services/ProfilesService.js';
export default
{
    setup()
    {
        const searchTerm = ref("");
        const router = useRouter();
        return {
            searchTerm,
            async search()
            {
                try
                {
                    postsService.clearPosts()
                    profilesService.clearProfiles();
                    router.push({name: "Search"});
                    await postsService.getByQuery({ query: searchTerm.value });
                    await profilesService.getByQuery({ query: searchTerm.value });
                }
                catch(error)
                {
                    logger.error("[Search.vue > search]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>