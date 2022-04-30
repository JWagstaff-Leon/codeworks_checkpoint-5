<template>
    <div>
        <Post v-for="p in posts" :key="p.id" :post="p" />
        <!-- TODO add pagination -->
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