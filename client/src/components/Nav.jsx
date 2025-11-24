import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { useNavigate } from "react-router-dom";
import Icon from '../assets/icon/Edited-web-icon.jpg';
import userIcon from '../assets/icon/user.png';
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
import { useAuth } from '../AuthContext';
import { useSessionStorage } from '../components/utilities/reusables';
import link from './utilities/exportor';
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

function Nav() {

    const Navigate = useNavigate();
    const { user, logout } = useAuth();
    if (user) {
        var role = user?.role;
        role = role?.charAt(0).toUpperCase() + role?.substring(1).toLowerCase();
        var userName = user?.username;
        userName = userName?.charAt(0).toUpperCase() + userName?.substring(1).toLowerCase();
    };

    const Logout = () => {
        sessionStorage.removeItem("token");
        logout();
        Navigate('/login');
        // useSessionStorage("style", { aSideBar: null });
    };

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
                            <p className="user-name" key={userName}>{userName}</p>
                            <p className="user-role" key={role + "1"}>{role}</p>
                        </div>
                        {role ?
                            (
                                <Menu
                                    menuClassName="header-LogoutMenu"
                                    align={"end"}
                                    arrow={true}
                                    viewScroll={"close"}
                                    position={"auto"}
                                    menuButton={
                                        <MenuButton className="header-LogoutMenuButton">
                                            <img src={userIcon} alt="userIcon" className='header-LogoutMenuIcon' />
                                        </MenuButton>
                                    }
                                >
                                    <MenuItem onClick={() => Navigate(link.url.myRequest)}>My Request</MenuItem>
                                    <MenuItem onClick={() => Logout()}>Log Out</MenuItem>
                                </Menu>
                            )
                            :
                            (<a className="logout-link" href="/login">Log In</a>)
                        }
                    </div>
                </div>
            </header>
            {/* <Popup open={ShowActionSide} onClose={() => ShowActionSide} modal></Popup> */}
        </div>
    )
}


export default Nav;

