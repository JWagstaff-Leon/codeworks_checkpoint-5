<template>
    <div class="row">
        <div class="col-10">
            <!-- TODO make a profile details component -->
            <CreatePost v-if="account.id === profile.id"/>
            <!-- TODO thread component will go here -->
        </div>
        <div class="col-2">
            <!-- TODO ad component will go here -->
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
export default
{
    created()
    {
        // TODO make the service layer get the profile here
    },

    setup()
    {
        return {
            account: computed(() => AppState.account),
            profile: computed(() => AppState.profile)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>