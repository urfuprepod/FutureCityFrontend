import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./shared/constants";
import SideBar from "./Widgets/Sidebar";

function App() {
    return (
        <div className="application">
            <SideBar />
            <main className="application-content">
                <Routes>
                    {routes.map((el) => (
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
