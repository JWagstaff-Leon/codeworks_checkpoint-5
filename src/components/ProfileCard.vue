<template>
    <div class="p-2 mx-5 my-3 border border-dark rounded shadow d-flex selectable no-select" @click="goToProfile(profile._id)">
        <div class="position-relative me-5">
            <img :src="profile.picture" class="profile-pic rounded-circle" />
            <div v-if="profile.graduated" class="grad-badge d-flex align-items-center justify-content-center"><i class="text-dark mdi mdi-school mdi-24px"></i></div>
        </div>
        <div class="d-flex flex-column justify-content-center">
            <h3 class="my-1">{{profile.class}}</h3>
            <h1 class="my-1">{{profile.name}}</h1>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
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
        const router = useRouter();
        return {
            goToProfile(id)
            {
                logger.log("profile results go to profile prop", id)
                router.push({ name: 'Profile', params: { id }});
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.profile-pic
{
    height: 10vw;
    width: 10vw;
    object-fit: cover;

    border: 0.2vw solid black;

    position: relative;
}

.grad-badge
{
    height: 2.5vw;
    width: 2.5vw;

    position: absolute;
    bottom: 0.5vw;
    left: 8vw;

    border: 0.18vw solid black;
    border-radius: 50%;
    background-color: white;
}
</style>