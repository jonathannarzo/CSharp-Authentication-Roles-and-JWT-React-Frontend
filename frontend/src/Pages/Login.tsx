import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { AxiosError } from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "Account/login/";

const Login = () => {
    const { setAuth }: any = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef(null);
    const errRef = useRef(null);

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        const uref = userRef.current as any;
        uref.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({
                    email: user,
                    password: pwd,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            // console.log(JSON.stringify(response.data));
            console.log(response);

            const accessToken = response.data.token;
            const roles = response.data.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser("");
            setPwd("");
            navigate(from, { replace: true });
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err?.response) {
                    setErrMsg("no server response");
                } else if (err.response?.status == 400) {
                    setErrMsg("Missing user or pass");
                } else if (err.response?.status == 401) {
                    setErrMsg("Unauthorized");
                } else {
                    setErrMsg("Login failed");
                }
            }
            const eref = errRef.current as any;
            eref.focus();
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Sign in</h1>
            </div>

            <p ref={errRef} className="">
                {errMsg}
            </p>

            <div className="card w-50">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Email address
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
