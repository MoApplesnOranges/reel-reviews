import { useState } from "react";

const EditProfileForm = ({ profile, setProfile }) => {
  const [formData, setFormData] = useState({
    username: profile.username,
    email: profile.email,
    password: profile.password,
    avatar: profile.avatar,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:8000/api/accounts/${profile.id}`;
    const fetchConfig = {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(url, fetchConfig);
      const editedData = await response.json();
      setProfile(editedData);
    } catch (error) {
      console.error("Update profile failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-control">
      <div>
        <label>Username</label>
        <input
          onChange={handleChange}
          value={formData.username}
          name="username"
          type="text"
          className="form-control"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          onChange={handleChange}
          value={formData.email}
          name="email"
          type="email"
          className="form-control"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          onChange={handleChange}
          value={formData.password}
          name="password"
          type="password"
          className="form-control"
        />
      </div>
      <div>
        <label>Avatar</label>
        <input
          onChange={handleChange}
          value={formData.avatar}
          name="avatar"
          type="url"
          className="form-control"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
export default EditProfileForm;
