import './App.css'
import LoginPage from "./ui/pages/auth/LoginPage.jsx";
import RegisterPage from "./ui/pages/auth/RegisterPage.jsx";
import Layout from "./ui/components/layout/Layout/Layout.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import MemberProfileRequestsPage from "./ui/pages/memberProfile/MemberProfileRequestsPage.jsx";
import AnnouncementsPage from "./ui/pages/announcement/announcements/AnnouncementsPage.jsx";
import AnnouncementDetailPage from "./ui/pages/announcement/announcementDetail/AnnouncementDetailPage.jsx";
import CreateEventPage from "./ui/pages/announcement/createEvent/CreateEventPage.jsx";
import CreatePublicationPage from "./ui/pages/announcement/createPublication/CreatePublicationPage.jsx";
import EditAnnouncementPage from "./ui/pages/announcement/editAnnouncement/EditAnnouncementPage.jsx";
import ProtectedRoute from "./ui/pages/auth/ProtectedRoute.jsx";
import HomePage from "./ui/pages/home/HomePage.jsx";
import ApprovedMembersPage from "./ui/pages/memberProfile/ApprovedMembersPage.jsx";
import ProfilePage from "./ui/pages/profile/ProfilePage.jsx";
import MyEventsPage from "./ui/pages/myEvents/MyEventsPage.jsx";




function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<Layout/>}>
                    <Route index element={<HomePage/>} />
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path='register' element={<RegisterPage/>}/>
                    <Route path='announcements' element={<AnnouncementsPage/>}/>
                    <Route path='announcements/event/:id' element={<AnnouncementDetailPage/>}/>
                    <Route path='announcements/publication/:id' element={<AnnouncementDetailPage/>}/>
                    <Route path='memberRequests' element={
                        <ProtectedRoute requiredRole="ROLE_ADMINISTRATOR">
                            <MemberProfileRequestsPage />
                        </ProtectedRoute>} />
                    <Route path='approvedMembers' element={
                        <ProtectedRoute requiredRole="ROLE_ADMINISTRATOR">
                            <ApprovedMembersPage />
                        </ProtectedRoute>} />
                    <Route path='create-event' element={
                        <ProtectedRoute requiredRole="ROLE_ADMINISTRATOR">
                            <CreateEventPage />
                        </ProtectedRoute>} />
                    <Route path='create-publication' element={
                        <ProtectedRoute requiredRole="ROLE_ADMINISTRATOR">
                            <CreatePublicationPage />
                        </ProtectedRoute>} />
                    <Route path='announcements/:type/:id/edit' element={
                        <ProtectedRoute requiredRole="ROLE_ADMINISTRATOR">
                            <EditAnnouncementPage />
                        </ProtectedRoute>} />
                    <Route path='profile' element={<ProfilePage/>}/>
                    <Route path='my-events' element={<MyEventsPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App