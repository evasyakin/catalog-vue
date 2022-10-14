import mock from './mock'

const delay = 100

function findCat(url) {
    // let parts = url.split('/')
    // parts.forEach(part => {
    //     // 
    // })

    function setCatSubsRecursive(cat, level = 0) {
        cat.level = level
        if (level >= subcat_level) return
        level++
        
        // let subcat_ids = mock.categoryParents
        // .filter(catPar => catPar.parent_id === cat.id)
        // .map(catPar => catPar.category_id)

        let subcat_ids = []
        let virtuals = {}
        for (let cat_parent of mock.categoryParents) {
            if (cat_parent.parent_id !== cat.id) continue
            subcat_ids.push(cat_parent.category_id)
            virtuals[cat_parent.category_id] = cat_parent.virtual
        }

        if (subcat_ids.length < 1) return
        
        let subcats = mock.categories.filter(sub => subcat_ids.includes(sub.id))
        subcats.forEach(sub => {
            sub.parent_id = cat.id
            sub.virtual = virtuals[sub.id]
            setCatSubsRecursive(sub, level)
        })
        cat.subcats = subcats
        // cats = cats.concat(subcats)
    }

    let cat = mock.categories.find(cat => cat.url == url)
    if (!cat) return null
    
    let subcat_level = cat.subcat_level// = 1
    setCatSubsRecursive(cat)
    // let cats = [cat]
    // console.log(cats)
    // return cats
    return cat
}

export default {
    category: {
        list: (args, cb) => {
            setTimeout(() => cb(mock.categories), delay)
        },
        one: (args, cb) => {
            setTimeout(() => cb(findCat(args.url)), delay)
        },
    }
}
