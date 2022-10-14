<template>
    <div>
        HomePage
        <div v-if="cats.length" style="display: flex; flex-direction: column;">
            <router-link a v-for="cat in cats" :key="cat.id" 
            :to="{name: 'category', params: { catUrl: cat.url }}">
                {{ cat.name }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        cats() {
            return this.$store.getters.category.all()
        },
    },
    created() {
        // if (!this.cats || !this.cats.length) 
        this.$store.getters.category.fetch()
    },
};
</script>
