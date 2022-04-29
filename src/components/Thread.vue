<template>
    <div>
        <!-- TODO post components go here -->
        <Post v-for="p in posts" :key="p.id" :post="p" />
    </div>
</template>

<script>
export default
{
    props: {
        posts:
        {
            type: Array,
            required: true
        }
    },

    setup()
    {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>