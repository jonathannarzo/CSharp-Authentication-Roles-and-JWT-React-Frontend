import axios from "../api/axios";
import useAuth from "./useAuth";

const LOGOUT_URL = "Account/logout";

const useLogout = () => {
    const { setAuth }: any = useAuth();

    const logout = async () => {
        setAuth({});

        try {
            const response = await axios(LOGOUT_URL, {
                withCredentials: true,
            });
        } catch (error) {
            console.error(error);
        }
    };
    return logout;
};

export default useLogout;
