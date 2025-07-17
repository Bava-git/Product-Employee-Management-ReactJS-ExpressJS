import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
    const [username, setuseName] = useState("");
    const [password, setuserPassword] = useState("");
    const Navigate = useNavigate();

    const verify_User = async () => {

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(username)) {
            toast.error('Invalid email format');
            return false;
        }

        try {
            const response = await axios.post(`http://localhost:3000/user/employeelogin`,
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            if (response.status === 200) {
                sessionStorage.setItem("token", JSON.stringify(response.data));
                Navigate('/');
                toast.success("Welcome, happy to have you here");
            }

        } catch (error) {
            if (error.response) {
                let errMsg = error.response.data.error;
                toast.error(errMsg);
            }
            console.error(error);
        }
    }


    return (
        <div className="Login-div">

            <div className="Employee-Container">
                <div className="login-element">
                    <p className="titleCard">Employee Log in</p>
                    <input type="email" className="loginEmail" placeholder="Username"
                        value={username} onChange={(event) => setuseName(event.target.value)}
                    />
                    <input type="password" className="loginPassword" placeholder="Passowrd"
                        value={password} onChange={(event) => setuserPassword(event.target.value)}
                    />
                    <button className="loginButton" onClick={verify_User}>Log in</button>
                </div>
            </div>

        </div>
    )
}

export default Login;
