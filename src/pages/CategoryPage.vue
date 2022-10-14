<template>
    <div>
        CategoryPage
        <RecursiveCategory v-if="cat" :cat="cat" />
    </div>
</template>

<script>
import RecursiveCategory from '@/parts/RecursiveCategory.vue'

export default {
    computed: {
        catUrl() {
            return this.$route.params.catUrl
        },
        cat() {
            return this.$store.getters.category.query()
            .where('url', this.catUrl)
            .withAllRecursive()
            .orderBy('priority')
            .first()
        },
    },
    created() {
        // if (!this.cat) 
        this.$store.getters.category.fetchOne({url: this.catUrl})
    },
    components: { RecursiveCategory, },
};
</script>
