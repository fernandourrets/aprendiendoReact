 
 /*Componentes*/
 import { useState, useEffect, useCallback } from "react"
 import ButtonGroup from "@/components/common/buttonGroup"

 import CustomCard from "@/components/common/CustomCard"
 import { useParams, useNavigate, useSearchParams } from "react-router-dom"

 /*Funciones*/
import  {getClientes, getCliByCategorias}  from "@/lib/api/clientes"
import { getCategories} from "@/lib/api/category"

export default function Landing() {

/*******************RENDERIZA CLIENTES Y CATEGORIAS*************************** */
const [clientes, setClientes] = useState([])

 const [categories, setCategories] = useState([])
/***************************************************************************** */

/*********************RENDERIZA POR FILTRO************************************* */
 const [renderCliCat, setRenderCliCat] = useState([])

 /********************RENDERIZA SEGUN BOTONES*************************************** */
const {buscarCategoria}=useParams()
/***************************************************************************** */

/*********************************************************************************** */
const [searchParams, setSearchParams]=useSearchParams()

/******************ROOTEA A LA URL SEGUN BOTONES******************************************** */
const navigate = useNavigate()
/***************************************************************************** */

/********************RENDERIZA PAGINA POR PRIMERA VEZ*************************** */
const fetchCategories = async () => {

    const dataCategoria = await getCategories()
 
    const dataTodasCategorias = {
        id: "0",
        name: "all",
        label: "Todos"
        }

    dataCategoria.unshift(dataTodasCategorias)
    setCategories(dataCategoria)   
   setClientes() 
        
}
/***************************************************************************** */

const fetchFilterByApellido = useCallback(() => {

    const filter= searchParams.get('ape')

    if(!filter){
        
        setRenderCliCat(clientes)
        return
    }

    const filterClientes = clientes.filter((e) => e.apellido.toLowerCase().includes(filter.toLowerCase()))
    setRenderCliCat(filterClientes)

}, [searchParams, clientes])
    
/*****************************RENDERIZA SEGUN BOTONES CATEGORIA***********************/
const fetchClientes = async () => {

const dataClientes = await (
 buscarCategoria === "all" || !buscarCategoria ? getClientes() : getCliByCategorias(buscarCategoria)
)

      setClientes(dataClientes)
      setRenderCliCat(dataClientes)

    }


/*********************RENDERIZA POR CATEGORIA*********************************** */
useEffect(() => {

    fetchCategories()
  
    }, [])
/***************************************************************************** */

/***************RENDERIZA CADA VEZ QUE CAMBIA UNA CATEGORIA*********************** */
    useEffect(() => {

        fetchClientes()
      
        }, [buscarCategoria])

/********************SETEA POR FILTRO POR APELLIDO************************************************ */

        useEffect(() => {

            fetchFilterByApellido()
           
            }, [searchParams])

/***************************************************************************** */


/*********************INPUT BUSQUEDA************************************************************ */
const handleclick=(buscarCategoria)=>{

        navigate(`/admin/clientes/categoria/${buscarCategoria}`)  
    }

/*****************ESCUCHA CAMBIOS EN INPUT BUSQUEDA********************************************/

const onChange=(value)=>{


setSearchParams({ape: value})


}

/********************RETORNO FUNCION*********************************************************/
    return(
    <>
    <section id="CategoryButton section">
        <ButtonGroup dataCategoria={categories} selectedItem={buscarCategoria} onClick={handleclick}/>

        <div className="w-full max-w-sm mx-auto my-4 px-4">
          <input
            type="search"
            placeholder="Buscar por apellido…"
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-luxury-surface border border-gold/15 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] placeholder-luxury-muted focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
    </section>

     <section id="CustomCard section">
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-6">
            {
                renderCliCat && renderCliCat.length > 0
                  ? renderCliCat.map((e) => (
                      <CustomCard key={e.id} cardClientes={e}/>
                    ))
                  : <p className="text-luxury-muted text-sm col-span-full text-center py-10">No hay clientes registrados.</p>
            }
        </div>    
    </section>
    </>
  )
}
