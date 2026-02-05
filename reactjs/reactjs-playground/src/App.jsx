import { useEffect } from "react";
import useUserStore from "./store/useUserStore";
import { getAccessToken } from "./utils/tokes";
import { Link, Outlet } from "react-router";
import api from "./utils/api";

function App(){
  const setUser = useUserStore((state) => (state.setUser))

  const getCurrentUser = async() => {
    try {
      const axiosResponse = await api.get("/users/me")
      console.log(axiosResponse);
    } catch (error) {
      console.error(error);
      
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return(
    <>
    <nav className="p-6 rounded-lg bg-rose-200 ">
      <Link to="/profile">My Profile</Link>
    </nav>

    <Outlet />
    </>
  )
}

export default App;  