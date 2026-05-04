
import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Clientes from "./pages/Clientes";
import Error from "./lib/maps/Error";
import PublicLayout from "./components/layouts/PublicLayout";

const router = createBrowserRouter([

    {
        path:"/",
        element:<PublicLayout/>,
        children:[{
            path:"/:buscarCategoria?",
            element:<Landing/>
        },],
        errorElement:<Error type="error_desconocido"/>
        
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