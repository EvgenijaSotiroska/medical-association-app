import Header from "../Header/Header.jsx";
import { Outlet } from 'react-router';
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout-box">
            <Header />
            <main className="outlet-container">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;