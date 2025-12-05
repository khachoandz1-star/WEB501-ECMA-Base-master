import { Navigate, Outlet } from "react-router-dom";

function AdminLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div>
      <h2>AdminLayout</h2>
      <Outlet />
    </div>
  );
}

export default AdminLayout;
