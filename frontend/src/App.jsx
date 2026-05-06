import './App.css'
import LoginPage from "./ui/pages/auth/LoginPage.jsx";
import RegisterPage from "./ui/pages/auth/RegisterPage.jsx";
import Layout from "./ui/components/layout/Layout/Layout.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import MemberProfileRequestsPage from "./ui/pages/memberProfile/MemberProfileRequestsPage.jsx";
import AnnouncementsPage from "./ui/pages/announcements/AnnouncementsPage.jsx";
import AnnouncementDetailPage from "./ui/pages/announcementDetail/AnnouncementDetailPage.jsx";
import CreateEventPage from "./ui/pages/createEvent/CreateEventPage.jsx";
import CreatePublicationPage from "./ui/pages/createPublication/CreatePublicationPage.jsx";
import EditAnnouncementPage from "./ui/pages/editAnnouncement/EditAnnouncementPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<LoginPage/>}/>
                    <Route path='register' element={<RegisterPage/>}/>
                    <Route path='memberRequests' element={<MemberProfileRequestsPage/>}/>
                    <Route path='announcements' element={<AnnouncementsPage/>}/>
                    <Route path='announcements/:type/:id/edit' element={<EditAnnouncementPage/>}/>
                    <Route path='announcements/event/:id' element={<AnnouncementDetailPage/>}/>
                    <Route path='announcements/publication/:id' element={<AnnouncementDetailPage/>}/>
                    <Route path='create-event' element={<CreateEventPage/>}/>
                    <Route path='create-publication' element={<CreatePublicationPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App