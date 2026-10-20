import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import AdminLayout from "./layout/AdminLayout"
import EnrolmnentDashboard from "./pages/EnrolmentDashboard"
import EnrolmentHome from "./pages/EnrolmentHome"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
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
    </Routes>
  )
}
