import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import RequireAuth from "./components/RequireAuth";
const Home = lazy(() => import("./Pages/Home"));
const SamplePage = lazy(() => import("./Pages/SamplePage"));
const Login = lazy(() => import("./Pages/Login"));
const Users = lazy(() => import("./Pages/Users"));
const NotFound = lazy(() => import("./Pages/NotFound"));
import Unauthorized from "./Pages/Unauthorized";
import PersistLogin from "./components/PersistLogin";

function App() {
    const [login, setLogin] = useState(true);
    return (
        <BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Header />

            <main className="container">
                <Routes>
                    <Route
                        index
                        element={
                            <Suspense fallback={<>...Loading...</>}>
                                <Home />
                            </Suspense>
                        }
                    />

                    <Route element={<PersistLogin />}>
                        <Route
                            element={
                                <RequireAuth
                                    allowedRoles={["User", "Administrator"]}
                                />
                            }
                        >
                            <Route
                                path="samplepage"
                                element={
                                    <Suspense fallback={<>...Loading...</>}>
                                        <SamplePage />
                                    </Suspense>
                                }
                            />
                        </Route>
                    </Route>
                    <Route
                        path="users"
                        element={
                            <Suspense fallback={<>...Loading...</>}>
                                <Users />
                            </Suspense>
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <Suspense fallback={<>...Loading...</>}>
                                <Login />
                            </Suspense>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
