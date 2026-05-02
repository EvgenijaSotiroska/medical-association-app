import './App.css'
import LoginPage from "./ui/pages/LoginPage.jsx";
import RegisterPage from "./ui/pages/RegisterPage.jsx";
import Layout from "./ui/components/layout/Layout/Layout.jsx";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<LoginPage/>}/>
            <Route path='register' element={<RegisterPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

  )
}

export default App
