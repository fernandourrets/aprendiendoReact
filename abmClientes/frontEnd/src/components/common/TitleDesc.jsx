

import { Label } from "../ui/label"

export default function TitleDesc({ title, description, errorCod }) {
    return(
        <div>

        

            {
              errorCod ?  <Label className="bg-red-500 text-white size-100 p-10 mb-5">{title} / {description}</Label> : <Label className="  text-green-300">{title} / {description}</Label> 
            }
            

            
            </div>


    )
    
}