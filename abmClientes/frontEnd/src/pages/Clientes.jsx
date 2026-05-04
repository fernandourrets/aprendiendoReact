import { useParams } from "react-router-dom";

export default function Clientes() {

    const { id } = useParams()

    return(
        <div>
            <h1 className="text-green-500 text-2xl">Clientes</h1>
            <p className="text-green-500 text-lg">ID: {id}</p>
        </div>
    )
}