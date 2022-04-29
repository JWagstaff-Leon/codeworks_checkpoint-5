<template>
    <div class="px-4">
        <!-- TODO post components go here -->
        <Post v-for="p in posts" :key="p.id" :post="p" />
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
            posts: computed(() => AppState.activePosts)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>