import { useEffect } from "react";
import axios from "axios";

export default function Logout() {
    useEffect(() => {
        const token = localStorage.getItem("refresh_token")
        console.log(token);
        (async () => {
          try {
            const { data } = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/logout/`,
              {
                refresh_token: token,
              },
              { headers: { "Content-Type": "application/json" } },
              { withCredentials: true }
            );
            localStorage.clear();
            axios.defaults.headers.common["Authorization"] = null;
            window.location.href = "/";
            console.log(data);
          } catch (e) {
            console.log("logout not working", e);
          }
        })();
      }, []);
  return (
    <div></div>
  )
}
