import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";

const UpdateProfile = () => {
  const [Hidelogin, setHidelogin] = useContext(TokenContext);
  const [accountId, setAccountId] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const fetchId = async () => {
    const url = "http://localhost:8000/token";
    const fetchConfig = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    const data = await response.json();
    const id = data.account.id;
    console.log(id);
    setAccountId(id);
  };

  const Update = async () => {
    const url = `http://localhost:8000/api/accounts/${accountId}`;
    const updateConfig = {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }, // Ensures cookies are stored for subsequent requests
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        avatar: avatar,
      }),
    };
    const response = await fetch(url, updateConfig);
    return response.json();
  };

  useEffect(() => {
    fetchId();
  }, []);

  const Logout = async () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    Update();
    Logout();
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Update Profile</h5>
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
            <label className="form-label">Email:</label>
            <input
              name="email"
              type="text"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="text"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Avatar:</label>
            <input
              name="avatar"
              type="text"
              className="form-control"
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
