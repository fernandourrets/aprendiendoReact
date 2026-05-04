import {
 
    SearchIcon
    
  } from "lucide-react"
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    selectType
  } from "@/components/ui/input-group"


import { useState, useEffect } from "react"





const inputAddon_map={
    Search: {
     type:  "text",
     Icon: SearchIcon,
     placeholder: "Buscar..."
    }

}


  export function InputAddOn({inputType, onChange}) {

    const [inputValue, setInputValue] = useState("")

    const handlerOnChange=(value)=>{
      
      onChange(value)
    }

    useEffect(() => {
      if(inputValue)
      setInputValue(inputAddon_map[inputType])
    }, [])


    const IconComponent= inputAddon_map[inputType].Icon

    return (
      // <div className="grid  border-grey-300 max-w-sm gap-6">
        <InputGroup>
        {
          selectType &&<>
          <InputGroupInput placeholder={inputAddon_map[inputType].placeholder}
          type={inputAddon_map[inputType].type} onChange={(e)=>handlerOnChange(e.target.value)} />
          <InputGroupAddon>
          <IconComponent/>
          </InputGroupAddon>
          </>
        }
        </InputGroup>
        
      //</div>
    )
  }
  