import { jwtDecode } from 'jwt-decode';
import { FileUser, HelpCircle, Package } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import link from './utilities/exportor';

function LeftSliter() {

  const Navigate = useNavigate();
  let userType = "";
  const auth = JSON.parse(sessionStorage.getItem("token")) || "";
  if (auth) {
    const deauth = jwtDecode(auth);
    userType = deauth.role;
  };

  return (
    <>
      {auth && <div className='aSideContainer'>
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <a className="nav-item nav-active" href={link.url.listofProduct}>
              <Package className="lucide-icon nav-icon" size={24} />
              Product
            </a>
            <a className="nav-item" href={link.url.listofEmployee}>
              <FileUser className="lucide-icon nav-icon" size={24} />
              Employee
            </a>
            <a className="nav-item" href={link.url.request}>
              <HelpCircle className="lucide-icon nav-icon" size={24} />
              Request
            </a>
          </nav>
        </aside>
      </div>}
    </>
  );
}

export default LeftSliter;
