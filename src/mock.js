const categories = [
    { id: 1, name: 'Электроника', url: 'elektronika', subcat_level: 2, priority: 0 },
    { id: 2, name: 'Автотовары', url: 'avtotovary', subcat_level: 2, priority: 0 },
    { id: 3, name: 'Автоэлектроника и навигация', url: 'avtotovary/avtoelektronika', subcat_level: 2, priority: 0 },
    { id: 4, name: 'Другие аксессуары и доп. оборудование', url: 'avtotovary/avtoaksessuary-i-dopolnitelnoe-oborudovanie', subcat_level: 2, priority: 0 },
    { id: 5, name: 'Электроника', url: 'avtotovary/avtoaksessuary-i-dopolnitelnoe-oborudovanie/elektronika', subcat_level: 2, priority: 0 },
    { id: 6, name: 'Гарнитуры и наушники', url: 'elektronika/garnitury-i-naushniki', subcat_level: 2, priority: 0 },
    { id: 7, name: 'Ноутбуки и компьютеры', url: 'elektronika/noutbuki-pereferiya', subcat_level: 2, priority: 0 },
    { id: 8, name: 'Ноутбуки и ультрабуки', url: 'elektronika/noutbuki-pereferiya/noutbuki-ultrabuki', subcat_level: 2, priority: 0 },
]

const categoryParents = [
    { id: 1, category_id: 4, parent_id: 1, position: 0, virtual: 1 },
    { id: 2, category_id: 3, parent_id: 2, position: 0, virtual: 0 },
    { id: 3, category_id: 4, parent_id: 2, position: 0, virtual: 0 },
    { id: 4, category_id: 5, parent_id: 4, position: 0, virtual: 0 },
    { id: 5, category_id: 6, parent_id: 1, position: 0, virtual: 0 },
    { id: 6, category_id: 7, parent_id: 1, position: 0, virtual: 0 },
    { id: 7, category_id: 8, parent_id: 7, position: 0, virtual: 0 },
    { id: 8, category_id: 3, parent_id: 1, position: 0, virtual: 1 },
]

// categories.forEach(cat => {
//     // let catPars = categoryParents.filter(catPar => catPar.parent_id == cat.id)

//     // catPars.forEach(catPar => {
//     //     cats = categories.filter(_cat => _cat.id == catPar.category_id)
//     // })
//     let subcat_ids = categoryParents
//     .filter(catPar => catPar.parent_id == cat.id)
//     .map(catPar => catPar.category_id)

//     cat.subcats = categories.filter(_cat => subcat_ids.includes(_cat.id))
//     cat.subcats.forEach(_cat => _cat.parent_id = cat.id)
// })

export default {
    categories, categoryParents
}
