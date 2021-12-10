import "../../styles/sidebar.css";
import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";

export default function SideBar() {
    const { user } = useUser();
    console.log(user);
    return (
        <div className="sidebar-container">
            i am sidebar
            <User />
            <Suggestions/>
        </div>
    );
}
