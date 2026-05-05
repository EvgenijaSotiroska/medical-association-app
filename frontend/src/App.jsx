import './App.css'
import LoginPage from "./ui/pages/auth/LoginPage.jsx";
import RegisterPage from "./ui/pages/auth/RegisterPage.jsx";
import Layout from "./ui/components/layout/Layout/Layout.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import MemberProfileRequestsPage from "./ui/pages/memberProfile/MemberProfileRequestsPage.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<LoginPage/>}/>
            <Route path='register' element={<RegisterPage/>}/>
            <Route path='memberRequests' element={<MemberProfileRequestsPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

  )
}

export default App
