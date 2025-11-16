import { Link, useNavigate } from "react-router-dom";
import Icon from '../assets/icon/Edited-web-icon.jpg';
import { jwtDecode } from 'jwt-decode';
import link from './utilities/exportor';

function Nav() {

    const auth = JSON.parse(sessionStorage.getItem("token")) || "";
    if (auth) {
        const deauth = jwtDecode(auth);
        var userType = deauth.role;
    }
    const Navigate = useNavigate();

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
                            <p className="user-role">{userType}</p>
                        </div>
                        {userType ?
                            (<a className="logout-link" onClick={Logout}>Log Out</a>)
                            :
                            (<a className="logout-link" href="/login">Log In</a>)
                        }
                    </div>
                </div>
            </header>
        </div>

        // <div className="Nav-div">
        //     <div>
        //         <img className="Nav-logo" src={Icon} alt="logo"
        //             onClick={() => { navigate("/") }}
        //         />
        //     </div>
        //     <div>
        //         {
        //             userType ?
        //                 <ul className="nav-ul">
        //                     <li>{userType}</li>
        //                     <li><Link onClick={Logout} to="/login">Log Out</Link></li>
        //                     {userType === "ADMIN" && <li><Link to="/test">test</Link></li>}

        //                 </ul>
        //                 :
        //                 <ul className="nav-ul">
        //                     <li><Link to="/login">Employee Log in</Link></li>
        //                 </ul>
        //         }
        //     </div>

        // </div>
    )
}


export default Nav;

