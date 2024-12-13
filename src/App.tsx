import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./shared/constants";
import SideBar from "./Widgets/Sidebar";
import { useGetCurrentUser } from "./app/hooks";
import { HeaderPanel } from "./shared/components";
import { useMemo } from "react";
import { IRoute } from "./shared/types";

function App() {
    const { user, isLoading } = useGetCurrentUser();

    const actualRoutes = useMemo<IRoute[]>(() => {
        return routes.filter((el) => el.userValidate?.(user) ?? true);
    }, [user]);

    if (isLoading) return "Loading...";
    return (
        <div className="application">
            <SideBar user={user} actualRoutes={actualRoutes} />
            <HeaderPanel user={user} />
            <main className="application-content">
                <Routes>
                    {actualRoutes.map((el) => (
                        <Route
                            key={el.path}
                            element={el.Component}
                            path={el.path}
                        />
                    ))}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
