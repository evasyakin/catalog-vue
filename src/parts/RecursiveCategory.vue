<template>
    <div class="category">
        <p class="category-title">
            <span class="level">{{ cat.level }} level</span>
            <span class="id">[{{ cat.id }}]</span>
            <router-link class="category-name" :to="{ name: 'category', params: { catUrl: cat.url }}">
                {{ cat.name }}
            </router-link>
            <span class="virtual">{{ cat.virtual }}</span>
        </p>
        <div v-if="cat.subcats" class="category-subs">
            <RecursiveCategory v-for="sub in cat.subcats" :key="sub.id" :cat="sub" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cat: { type: Object },
    },
};
</script>
