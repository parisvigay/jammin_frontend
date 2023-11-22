import { useEffect } from "react";
import axios from "axios";

export default function Logout() {
    useEffect(() => {
        const token = localStorage.getItem("refresh_token")
        console.log(token);
        (async () => {
          try {
            const { data } = await axios.post(
              'http://localhost:8000/logout/',
              {
                refresh_token: token,
              },
              { headers: { "Content-Type": "application/json" } },
              { withCredentials: true }
            );
            localStorage.clear();
            axios.defaults.headers.common["Authorization"] = null;
            window.location.href = "/";
          } catch (e) {
            console.log("logout not working", e);
          }
        })();
      }, []);
  return (
    <div></div>
  )
}
