import { useEffect } from "react";
import NavBar from "../components/NavBar";
import '../styles/dashboard.css';
import SideBar from "../components/sidebar/Sidebar";
import Timeline from "../components/Timeline";

export default function Dashboard() {

    useEffect(() => {
        document.title = "Instagram";
    }, []);

    return (
        <div className="main-container">
            <NavBar />
            <div className="main-content">
                
                <Timeline />
                <SideBar />
            </div>
        </div>
    );
}

