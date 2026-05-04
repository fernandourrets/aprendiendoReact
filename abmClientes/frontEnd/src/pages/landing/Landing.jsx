 
 /*Componentes*/
 import { useState, useEffect, use } from "react"
 import ButtonGroup from "@/components/common/buttonGroup"

 import CustomCard from "@/components/common/CustomCard"
 import { useParams, useNavigate, useSearchParams } from "react-router-dom"

 /*Funciones*/
import  {getClientes, getCliByCategorias}  from "@/lib/api/clientes"
import { getCategories} from "@/lib/api/category"
import { InputAddOn } from "@/components/common/inputs/inputAddon"

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

const fetchFilterByApellido = () => {

    const filter= searchParams.get('ape')

    if(!filter){
        
        setRenderCliCat(clientes)
        return
    }

    const filterClientes = clientes.filter((e) => e.ape.toLowerCase().includes(filter.toLowerCase()))
    setRenderCliCat(filterClientes)

}
    
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

        navigate(`/${buscarCategoria}`)  
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

        <div className="w-full max-w-md mx-auto my-6 px-4">
  <div className="bg-gray-100 border border-gray-400 rounded-xl shadow-sm p-3 transition hover:shadow-md">
    <InputAddOn inputType="Search" onChange={onChange} />
  </div>
</div>

    </section>
     <section id="CustomCard section">
   
    <div  className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-10 flex flex-col gap-10">
        {

            renderCliCat && renderCliCat.length > 0 ? renderCliCat.map((e) => (
                
                <CustomCard cardClientes= {e}/>
            )) : <p className="bg-red-500 text-white p-5">| No hay clientes registrados |</p>
        }
   
    </div>    
    </section>
        
    </> 
)

}

 
