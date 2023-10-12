import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";

const LoginForm = () => {
  const [Hidelogin, setHidelogin] = useContext(TokenContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernames, setUsernames] = useState("");
  const [token, setToken] = useState(null);
  const { login } = useToken();
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

  useEffect(() => {
    fetchUsers();
  }, []);

  // const getToken = async () => {
  //   const url = "http://localhost:8000/token";
  //   const fetchConfig = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   };
  //   const response = await fetch(url, fetchConfig);
  //   const tokenData = await response.json();
  //   setToken(tokenData);
  //   console.log(token);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernames.includes(username)) {
      alert("Please login with a registered username.");
      return;
    } else {
      login(username, password).then(() => {
        (async () => {
          const url = "http://localhost:8000/token";
          const fetchConfig = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          };
          const response = await fetch(url, fetchConfig);
          const tokenData = await response.json();

          if (tokenData === null) {
            const url = "http://localhost:8000/token";
            const fetchConfig = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            };
            const response = await fetch(url, fetchConfig);
            const token = await response.json();
            if (token === null) {
              alert("Incorrect username and password. Try again");
            } else {
              e.target.reset();
              navigate("/");
              setHidelogin(false);
              if (!Hidelogin) {
                navigate("/");
              }
            }
          }
        })();
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!usernames.includes(username)) {
  //     alert("Please login with a registered username.");
  //     return;
  //   } else {
  //     await login(username, password);
  //     await getToken();
  //     if (token === null) {
  //       await login(username, password);
  //       await getToken();
  //       if (token === null) {
  //         alert("Incorrect username and password. Try again");
  //       } else {
  //         e.target.reset();
  //         navigate("/");
  //         setHidelogin(false);
  //         if (!Hidelogin) {
  //           navigate("/");
  //         }
  //       }
  //     }
  //   }
  // };

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
