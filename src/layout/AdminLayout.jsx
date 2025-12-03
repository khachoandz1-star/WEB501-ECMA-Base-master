import { Navigate, Outlet } from "react-router-dom";

function AdminLayout(){

    //check token
    const token = localStorage.getItem("token");
    if(!token) return <Navigate to={'/login'}/>
return(
    <div>
            AdminLayout
   <Outlet/>
    </div>

)
   

}
export default AdminLayout;