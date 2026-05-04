
import { Button } from "@/components/ui/button";

export default function ButtonGroup({dataCategoria, selectedItem = "all", onClick}) {



const handleclick = (value) => {

    onClick(value)
    
}

    return(

        <>

    
        <div className="flex justify-center content-center">
       
    <div className=" bg-gray-100 border border-gray-400 rounded-xl shadow-sm p-3 transition hover:shadow-md">
    
        {
        dataCategoria && dataCategoria.length > 0 ? dataCategoria.map((e,i) => (
         
           
    <Button variant={selectedItem===e.name ? "default" : "outline"} 
    className="rounded-full my-1 mx-3 p-5" key={e.id} onClick={()=>{
        handleclick(e.name)
        
        
    }} >{e.label}</Button>)) : "No hay categorias registradas"
        }

    </div>

    </div>
    </>
    )

}