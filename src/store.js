import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'

import Category from '@/store/Category.js'
import CategoryParent from '@/store/CategoryParent.js'

// Create a new instance of Database.
const database = new VuexORM.Database()

// Register Models to Database.
database.register(Category)
database.register(CategoryParent)

const getters = {
    // api: () => api,
    category: () => Category,
    categoryParents: () => CategoryParent,
}

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.Store({
    plugins: [VuexORM.install(database)],
    getters,
})

export default store
