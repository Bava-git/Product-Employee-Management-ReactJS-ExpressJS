import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode } from 'jwt-decode';
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
import { useAuth } from '../../AuthContext';

function Login() {
    const [username, setuseName] = useState("");
    const [password, setuserPassword] = useState("");
    const Navigate = useNavigate();

    const verify_User = async () => {

        try {
            const response = await axios.post(`http://localhost:3000/user/employeelogin`,
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            if (response.status === 200) {
                processAuth(response.data);
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
    };

    const { login } = useAuth();
    const processAuth = (token) => {
        sessionStorage.setItem("token", JSON.stringify(token));
        let decoded = jwtDecode(token);
        login({ role: decoded.role, id: decoded.id, username: decoded.username });
    };


    return (
        <div className="Login-div">
            <div className='EmployeeLogin-lside'></div>
            <div className="EmployeeLogin-Container">
                <p className="titleCard">Employee Log in</p>
                <div className='EmployeeLogin-field'>
                    <p>Username:</p>
                    <input type="email" className="loginEmail" placeholder="Enter your username"
                        value={username} onChange={(event) => setuseName(event.target.value)} />
                </div>
                <div className='EmployeeLogin-field'>
                    <p>Password:</p>
                    <input type="password" className="loginPassword" placeholder="Enter your passowrd"
                        value={password} onChange={(event) => setuserPassword(event.target.value)} />
                </div>
                <div className='EmployeeLogin-field'>
                    <button className='commonButton' onClick={verify_User}>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
