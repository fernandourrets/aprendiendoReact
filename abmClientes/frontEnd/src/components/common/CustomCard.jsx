import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import TitleDesc from "@/components/common/TitleDesc"
  import { Link } from "react-router-dom"
  import  {categoryMap}  from "@/lib/maps/category"
  import { Badge } from "@/components/ui/badge"
  
  export default function CustomCard({cardClientes}) {

const {dni, nom, ape, cat} = cardClientes
const IconComponent= categoryMap[cat].icon


    return (

     

      <Card className="w-[380px] rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl shadow-gray-600/50 hover:shadow-gray-700/70 transition-all duration-300 hover:-translate-y-1">
  
        <CardHeader className="flex flex-row items-start justify-between">

          <div>
            <CardTitle className="text-xl font-bold">
            
              <TitleDesc title="Datos Cliente" description=" Vehiculo" />
            </CardTitle>
            <CardDescription className="text-blue-100">
            
            </CardDescription>
          </div>  
  
          <CardAction>
          <IconComponent className="mb-1 ml-5"></IconComponent>
            <Badge className= {categoryMap[cat].color}>{categoryMap[cat].label}
            <IconComponent></IconComponent>
            </Badge>
          </CardAction>
        </CardHeader>
  
        <CardContent className="space-y-2">

        <p className="text-sm text-blue-100">
           DNI: {dni} 
          </p>
          <p className="text-sm text-blue-100">
           Nombre: {nom} 
          </p>
          <p className="text-sm text-blue-100">
          Apellido: {ape}
          </p>
        </CardContent>
  
        <CardFooter className="border-t border-gray-300/30 pt-4">
          <p className="text-xs text-gray-200">
            
            Ultima actualizacion: 20 / 04 / 2026
            <Link to={`/clientes/${dni}`} className="text-blue-300 hover:underline ml-2">
              + info</Link>
          </p>
        </CardFooter>
  
      </Card>
      
    )
  }