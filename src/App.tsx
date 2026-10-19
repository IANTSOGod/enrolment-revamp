import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import AdminLayout from "./layout/AdminLayout"
import EnrolmnentDashboard from "./pages/EnrolmentDashboard"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/admin" element={<AdminLayout></AdminLayout>}>
        <Route
          path="/admin/dashboard"
          element={<EnrolmnentDashboard></EnrolmnentDashboard>}
        ></Route>
      </Route>
    </Routes>
  )
}
