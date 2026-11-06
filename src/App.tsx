import { Route, Routes } from "react-router"
import AdminLayout from "./layout/AdminLayout"
import EnrolmnentDashboard from "./pages/EnrolmentDashboard"
import EnrolmentHome from "./pages/EnrolmentHome"
import LoginEnrolment from "./pages/LoginEnrolment"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginEnrolment></LoginEnrolment>}></Route>
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
