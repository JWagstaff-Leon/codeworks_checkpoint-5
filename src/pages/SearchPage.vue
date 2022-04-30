<template>
    <!-- TODO profile results will go here -->
    <!-- TODO thread component populated with search results will go here -->
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { adsService } from '../services/AdsService.js';
export default
{
    setup()
    {
        onMounted(() =>
        {
            try
            {
                adsService.clearAds();
                adsService.getAds();
            }
            catch(error)
            {
                logger.error("[SearchPage.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        });

        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>