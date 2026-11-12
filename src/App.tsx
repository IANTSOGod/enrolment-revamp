import { Navigate, Outlet, Route, Routes, useLocation } from "react-router"
import AdminLayout from "./layout/AdminLayout"
import EnrolmnentDashboard from "./pages/EnrolmentDashboard"
import EnrolmentHome from "./pages/EnrolmentHome"
import LoginEnrolment from "./pages/LoginEnrolment"

function RequireAuth() {
  const location = useLocation()

  if (!localStorage.getItem("token")) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginEnrolment></LoginEnrolment>}></Route>
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<AdminLayout></AdminLayout>}>
          <Route
            path="/admin/dashboard"
            element={<EnrolmnentDashboard></EnrolmnentDashboard>}
          ></Route>
          <Route
            path="/admin/enrolmenthome"
            element={<EnrolmentHome></EnrolmentHome>}
          ></Route>
        </Route>
      </Route>
    </Routes>
  )
}
