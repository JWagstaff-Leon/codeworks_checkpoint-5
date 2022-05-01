<template>
    <div v-if="ads.length > 0" class="w-100">
        <img :src="ads[Math.round(Math.random())].banner" class="ad action shadow" />
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js';
export default
{
    setup()
    {
        return {
            ads: computed(() => AppState.ads)
        }
    }
}
</script>

<style lang="scss" scoped>
.ad-col
{
    padding-right: 0px;
}

.ad
{
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>