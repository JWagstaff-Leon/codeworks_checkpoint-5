<template>
        <!-- <div :v-for="(a, i) in ads" :key="i">
            <img :src="a.tall" class="img-fluid" />
        </div> -->
        <div class="d-flex flex-column align-items-end h-100" v-if="ads.length > 0">
            <div class="d-flex h-50 justify-content-end ad-col py-3">
                <img :src="ads[0].tall" class="ad action shadow" />
            </div>
            <div class="d-flex h-50 justify-content-end ad-col py-3">
                <img :src="ads[1].tall" class="ad action shadow" />
            </div>
        </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { adsService } from "../services/AdsService.js";
import { AppState } from '../AppState.js';
export default
{
    setup()
    {
        onMounted(async () =>
        {
            try
            {
                adsService.clearAds();
                await adsService.getAds();
            }
            catch(error)
            {
                logger.error("[Ad.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        })

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
    height: 100%;
    max-width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>