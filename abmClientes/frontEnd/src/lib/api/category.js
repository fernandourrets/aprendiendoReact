import dataCategoria from '../data/categories.json'

export const getCategories = async () => {


return dataCategoria

}

/*----------------------------------------------------------*/

// export const getCatByCat = async (buscarCategoria) => {


//     const allCategories = await getCategories()

//     const res= allCategories.filter(e => e.name == buscarCategoria)
//     return res
    
//     }