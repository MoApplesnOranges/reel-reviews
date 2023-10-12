import { useState, useContext, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";

const SignupForm = () => {
  const [Hidelogin, setHidelogin] = useContext(TokenContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [emails, setEmails] = useState([]);
  const { register } = useToken();
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
      setEmails((prev) => [...prev, el["email"]]);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const accountData = {
      username: username,
      password: password,
      email: email,
      avatar: avatar,
    };

    if (usernames.includes(username)) {
      alert(`${username} is already taken, Please select any other name.`);
      return;
    } else if (emails.includes(email)) {
      alert(`${email} is already taken, Please select another email.`);
      return;
    } else {
      register(accountData, `${process.env.REACT_APP_API_HOST}/api/accounts`);
      e.target.reset();
      setHidelogin(false);
      navigate("/");
    }
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Signup</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleRegistration(e)}>
          <div className="mb-3">
            <label className="form-label">username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">email</label>
            <input
              name="email"
              type="text"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">avatar</label>
            <input
              name="avatar"
              type="text"
              className="form-control"
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
