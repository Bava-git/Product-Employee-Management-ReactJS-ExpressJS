import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Icon from '../assets/icon/Edited-web-icon.jpg';
import { useAuth } from '../AuthContext';

function Nav() {

    const Navigate = useNavigate();
    const { role } = useAuth();

    const Logout = () => {
        sessionStorage.clear();
        Navigate('/login');
    }

    return (
        <div className="Nav-div">
            <header className="main-header">
                <div className="sidebar-header">
                    <div className="logo-box">
                        <img className="Nav-logo" src={Icon} alt="logo"
                            onClick={() => { Navigate("/") }}
                        />
                    </div>
                    <span className="logo-text">PEMABAY</span>
                </div>
                <div className="header-linksDiv">
                    <div className="user-info">
                        <div className="user-text">
                            <p className="user-role">{role}</p>
                        </div>
                        {role ?
                            (<a className="logout-link" onClick={Logout}>Log Out</a>)
                            :
                            (<a className="logout-link" href="/login">Log In</a>)
                        }
                    </div>
                </div>
            </header>
        </div>
    )
}


export default Nav;

