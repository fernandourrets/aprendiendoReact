
import TitleDesc from "@/components/common/TitleDesc"
import { Link } from "react-router-dom"
import {Button} from "@/components/ui/button"



export default function Error({type}) {
    

const errorType= {
    error_desconocido: {
        title: "Error desconocido",
        description: "Se produjo un error desconocido en la app.",
        errorCod: "Error desconocido"
       
    },

    error_404: {
        title: "ERROR 404",
        description: "Oops! La ruta solicitada no existe.",
        errorCod: "Error 404",
        
        
        redirect: {
            linkTo: "/",
            text: "Volver al Inicio"
        }
    }
   
}




        return(
            <div className="flex flex-col items-center justify-center h-screen">

            <TitleDesc title={errorType[type].title} description={errorType[type].description} errorCod={errorType[type].errorCod} />
            
            {

            errorType[type].redirect && (
                <Link to={errorType[type].redirect.linkTo}>
                    <Button variant="destructive"> {errorType[type].redirect.text}</Button>
                </Link>
            )

            }

            </div>

            )

           
}