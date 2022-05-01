<template>
        <!-- <div :v-for="(a, i) in ads" :key="i">
            <img :src="a.tall" class="img-fluid" />
        </div> -->
        <div class="row d-flex align-items-end sub-col h-100" v-if="ads.length > 0">
            <div class="col-12 h-50 d-flex justify-content-end ad-col">
                <img :src="ads[0].tall" class="ad action" />
            </div>
            <div class="d-flex col-12 h-50 justify-content-end ad-col">
                <img :src="ads[1].tall" class="ad action" />
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
    width: auto;
    object-fit: cover;
    object-position: center;
}
</style>