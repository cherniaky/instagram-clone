import { Route, Navigate, Outlet } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function ProtectedRoute({ user, children, ...rest }) {
   // console.log(user);
    return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (user) {
                    return children;
                }
                if (!user) {
                    return <Navigate to={ROUTES.LOGIN} />;
                }

                return null;
            }}
        />
    );
}
