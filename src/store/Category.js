import Model from '@/core/Model.js'
// import CategoryParent from './CategoryParent.js'

export default class Category extends Model {
    static entity = 'category'
    static routes = {
        fetch: ['category', 'list'],
        fetchOne: ['category', 'one'],
    }

    static fields() {
        return {
            id: this.number(null),
            name: this.string(null),
            url: this.string(null),
            subcat_level: this.number(null),
            priority: this.number(null),
            subcat_ids: this.attr(null),
            // parent_ids: this.attr(null),
            parent_id: this.number(0),

            level: this.number(0),
            virtual: this.number(0),
            
            // subcats: this.hasMany(Category, 'subcat_ids'),
            subcats: this.hasMany(Category, 'parent_id'),

            // subcats: this.belongsToMany(Category, CategoryParent, 'parent_id', 'catalog_id'),
            // parents: this.belongsToMany(Category, CategoryParent, 'catalog_id', 'parent_id'),
        }
    }
}
