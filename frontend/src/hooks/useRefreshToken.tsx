import axios from "../api/axios";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const REFRESH_URL = "Account/refresh/";

const useRefreshToken = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    const { setAuth }: any = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get(REFRESH_URL, {
                withCredentials: true,
            });

            setAuth((prev: any) => {
                console.log(JSON.stringify(prev));
                console.log(response.data.token);
                return {
                    ...prev,
                    roles: response.data.roles,
                    accessToken: response.data.token,
                };
            });
            return response.data.token;
        } catch (error: any) {
            // Logout the user refresh token expired
            const codes = [400, 401, 403];
            if (codes.indexOf(error?.response?.status) !== -1) {
                await logout();
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
        }
    };

    return refresh;
};

export default useRefreshToken;
