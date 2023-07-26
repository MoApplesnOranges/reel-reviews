import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";

const LoginForm = () => {
  const [Hidelogin, setHidelogin] = useContext(TokenContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password)
      .then(() => {
        e.target.reset();
        setHidelogin(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
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
