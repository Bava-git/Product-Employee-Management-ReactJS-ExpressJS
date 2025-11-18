import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Icon from '../assets/icon/Edited-web-icon.jpg';
import { useAuth } from '../AuthContext';
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import Popup from 'reactjs-popup';
import userIcon from '../assets/icon/user.png';
import link from './utilities/exportor';

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
                                    <MenuItem><a href={link.url.myRequest} className="logout-link">My Request</a></MenuItem>
                                    <MenuItem><a className="logout-link" onClick={Logout}>Log Out</a></MenuItem>
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

