import { Link, useNavigate } from "react-router-dom";
import Icon from '../assets/icon/Edited-web-icon.jpg';
import { jwtDecode } from 'jwt-decode';

function Nav() {

    const auth = JSON.parse(sessionStorage.getItem("token")) || "";
    if (auth) {
        const deauth = jwtDecode(auth);
        var userType = deauth.role;
    }
    const navigate = useNavigate();

    const Logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <div className="Nav-div">
            <div>
                <img className="Nav-logo" src={Icon} alt="logo"
                    onClick={() => { navigate("/") }}
                />
            </div>
            <div>
                {
                    userType ?
                        <ul className="nav-ul">
                            <li>{userType}</li>
                            <li><Link onClick={Logout} to="/login">Log Out</Link></li>
                            {userType === "ADMIN" && <li><Link to="/test">test</Link></li>}

                        </ul>
                        :
                        <ul className="nav-ul">
                            <li><Link to="/login">Employee Log in</Link></li>
                        </ul>
                }
            </div>

        </div>
    )
}


export default Nav;

