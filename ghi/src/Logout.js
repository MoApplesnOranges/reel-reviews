import useToken from '@galvanize-inc/jwtdown-for-react';
import { useState, useEffect } from 'react';

function Logout() {
    const handleLogout = async () => {
        const url = "http://localhost:8000/token"
        const fetchConfig = {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch (url, fetchConfig)
        if (response.ok) {
            console.log("successfully logged out")
        }
    }
    // useEffect(() => {handleLogout();}, []);
    handleLogout();
}

export default Logout;
