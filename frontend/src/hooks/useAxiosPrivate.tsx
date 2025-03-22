import { useNavigate } from "react-router-dom";
import axios, { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth }: any = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"] && auth?.accessToken) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${auth.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 401 && !prevRequest._retry) {
                    prevRequest._retry = true; // Prevent infinite retry loop

                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers[
                            "Authorization"
                        ] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        console.error("Refresh Token Expired:", refreshError);
                        return Promise.reject(refreshError);
                    }
                } else if (error?.response?.status === 403) {
                    navigate("/unauthorized", { replace: true }); // Redirect on 403 Forbidden
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
