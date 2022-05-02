<template>
    <div>
        <Post v-for="p in posts" :key="p.id" :post="p" />
        <h1 class="mt-4 ms-2" v-if="posts.length <= 0">No Posts Found</h1>
        <Pagination />
        <BannerAd v-if="posts.length > 0"/>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
export default
{
    setup()
    {
        
        return {
            posts: computed(() => AppState.activePosts),
        }
    }
}
</script>

<style lang="scss" scoped>

</style>