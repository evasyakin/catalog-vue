import Model from '@/core/Model.js'

export default class CategoryParent extends Model {
    static entity = 'category_parent'

    static fields() {
        return {
            id: this.number(null),
            category_id: this.number(null),
            parent_id: this.number(null),
        }
    }
}
