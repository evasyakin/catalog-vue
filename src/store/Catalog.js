import Model from '@/core/Model.js'

export default class Catalog extends Model {
    static entity = 'catalog'
    static routes = {
        fetch: ['catalog', 'list'],
        fetchOne: ['catalog', 'one'],
    }
}
