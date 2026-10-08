import { Route, Routes } from "react-router"
import Login from "./pages/Login"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
    </Routes>
  )
}
