import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";

function Logout() {
  const [Hidelogin, setHidelogin] = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const url = "http://localhost:8000/token";
      const fetchConfig = {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        setHidelogin(true);
        navigate("/");
        if (Hidelogin) {
          navigate("/");
        }
      }
    };
    handleLogout();
  }, [setHidelogin, Hidelogin, navigate]);

  return null;
}

export default Logout;
