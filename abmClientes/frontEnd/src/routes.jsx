
import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Clientes from "./pages/Clientes";
import Error from "./lib/maps/Error";

const router = createBrowserRouter([

{
    path:"/:buscarCategoria?",
    element:<Landing/>
    
    

},

{
    path:"/clientes/:id",
    element:<Clientes/>,
    
},

{
    path:"*",
    element:<Error type="error_404"/>,
    errorElement:<Error type="error_desconocido"/>
    
}


])

export default router;