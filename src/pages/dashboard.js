import { useEffect } from "react";
import NavBar from "../components/NavBar";
import '../styles/dashboard.css';
import SideBar from "../components/sidebar/Sidebar";
import Timeline from "../components/Timeline";

export default function Dashboard({inHome,setInHome,setInProfile}) {

    useEffect(() => {
        document.title = "Instagram";
        setInHome(true);
        setInProfile(false);
    }, []);

    return (
        <div className="main-container">
            <NavBar inHome={inHome}/>
            <div className="main-content">
                
                <Timeline />
                <SideBar />
            </div>
        </div>
    );
}

