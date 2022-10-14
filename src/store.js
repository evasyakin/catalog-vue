import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'

import Catalog from '@/store/Catalog.js'

// Create a new instance of Database.
const database = new VuexORM.Database()

// Register Models to Database.
database.register(Catalog)

const getters = {
    // api: () => api,
    catalog: () => Catalog,
}

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.Store({
    plugins: [VuexORM.install(database)],
    getters,
})

export default store
