import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";

const LoginForm = () => {
  const [Hidelogin, setHidelogin] = useContext(TokenContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernames, setUsernames] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const url = "http://localhost:8000/api/accounts/all";
    const fetchConfig = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    const data = await response.json();
    data.forEach((el) => {
      setUsernames((prevArray) => [...prevArray, el["username"]]);
    });
  };

  const Login = async () => {
    const url = "http://localhost:8000/token"; // replace with actual login endpoint
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const loginConfig = {
      method: "POST",
      credentials: "include", // Ensures cookies are stored for subsequent requests
      body: formData, // Adjust based on expected payload format
    };
    const response = await fetch(url, loginConfig);
    if (response.ok) {
      return true;
    } else {
      console.error("Login failed", response.status);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernames.includes(username)) {
      alert("Please login with a registered username.");
      return;
    } else {
      const loginSuccess = await Login();
      if (!loginSuccess) {
        alert("Incorrect username and password. Try again");
        return;
      } else {
        e.target.reset();
        navigate("/");
        setHidelogin(false);
        if (!Hidelogin) {
          navigate("/");
        }
      }
    }
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
