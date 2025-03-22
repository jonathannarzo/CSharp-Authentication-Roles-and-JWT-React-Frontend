import { useNavigate, Link, useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const { auth }: any = useAuth();

    const activeNav = (currentNav: string) => {
        const pathLocation = useLocation().pathname;
        return pathLocation === currentNav ? "nav-link active" : "nav-link";
    };

    const signOut = async () => {
        await logout();
        navigate("/login");
    };
    const [openMenu, toggleOpenMenu] = useState(false);
    return (
        <>
            <nav
                className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark"
                aria-label="Main navigation"
            >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Offcanvas navbar
                    </a>
                    <button
                        className="navbar-toggler p-0 border-0"
                        type="button"
                        id="navbarSideCollapse"
                        aria-label="Toggle navigation"
                        onClick={() => toggleOpenMenu(!openMenu)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className={
                            openMenu
                                ? "navbar-collapse offcanvas-collapse open"
                                : "navbar-collapse offcanvas-collapse"
                        }
                        id="navbarsExampleDefault"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={activeNav("/")} to="/">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={activeNav("/samplepage")}
                                    to="/samplepage"
                                >
                                    SamplePage
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={activeNav("/users")}
                                    to="/users"
                                >
                                    Users
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            {auth?.accessToken ? (
                                <button
                                    className="btn btn-outline-success"
                                    type="button"
                                    onClick={signOut}
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    className="btn btn-outline-success"
                                    type="button"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
            <div className="nav-scroller bg-body shadow-sm">
                <nav className="nav" aria-label="Secondary navigation">
                    <a className="nav-link active" aria-current="page" href="#">
                        Dashboard
                    </a>
                    <a className="nav-link" href="#">
                        Friends
                        <span className="badge text-bg-light rounded-pill align-text-bottom">
                            27
                        </span>
                    </a>
                    <a className="nav-link" href="#">
                        Explore
                    </a>
                    <a className="nav-link" href="#">
                        Suggestions
                    </a>
                    <a className="nav-link" href="#">
                        Link
                    </a>
                    <a className="nav-link" href="#">
                        Link
                    </a>
                    <a className="nav-link" href="#">
                        Link
                    </a>
                    <a className="nav-link" href="#">
                        Link
                    </a>
                    <a className="nav-link" href="#">
                        Link
                    </a>
                </nav>
            </div>
        </>
    );
};

export default Header;
