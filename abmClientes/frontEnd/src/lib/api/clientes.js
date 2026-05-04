
import dataCliente from '../data/clientes.json'

export const getClientes = async () => {


return dataCliente

}


/*----------------------------------------------------------*/

export const getCliByCategorias = async (buscarCategoria) => {


    const allClientes = await getClientes()

    const res= allClientes.filter(e => e.cat == buscarCategoria)
    return res
    
    }