import { Outlet } from "react-router-dom";
import Hero from "../landing/Hero";
import Footer from "../common/footer";


export default function PublicLayout() {

return(
    <div>
        <Hero/>
        <Outlet/>
        <Footer/>
    </div>
)

}