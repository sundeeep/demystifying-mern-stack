import axios from "axios";
import { getAccessToken, setAccessToken } from "./tokes";
import { useNavigate } from "react-router";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, //http://localhost:8000
    withCredentials: true // send httpOnly Cookies 
})

const navigate = useNavigate();

api.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log(originalRequest);

        if(error.response?.status === 401 && !originalRequest?.retry){
            originalRequest.retry = true;
            // sending reuest to /users/auth/refresh
            try {
                const axiosResponse = await axios.post("http://localhost:8000/users/auth/refresh", {}, {withCredentials: true})

                const newAccessToken = axiosResponse.data.accessToken;

                setAccessToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (error) {
                localStorage.removeItem("accessToken");
                navigate("/login");
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export default api;