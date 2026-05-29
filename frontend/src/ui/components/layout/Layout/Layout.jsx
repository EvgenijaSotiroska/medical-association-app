import Header from "../Header/Header.jsx";
import { Outlet } from 'react-router';
import Footer from "../Footer/Footer.jsx";

import './Layout.css';

const Layout = () => {
    return (
        <div className="layout-box">
            <Header />
            <main className="outlet-container">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;