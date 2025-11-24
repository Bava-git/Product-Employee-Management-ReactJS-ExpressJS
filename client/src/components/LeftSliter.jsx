import { FileUser, HelpCircle, Package } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
import { useAuth } from '../AuthContext';
import { useSessionStorage } from '../components/utilities/reusables';
import link from './utilities/exportor';
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------

function LeftSliter() {

  const Navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role;
  const [style, setStyle] = useSessionStorage("style", { aSideBar: null });
  const [Highlighter, setHighlighter] = useState(style.aSideBar);
  const Location = useLocation();

  const handleStyle = (e, item) => {
    e.preventDefault();
    setStyle(prev => ({
      ...prev,
      aSideBar: item
    }));
    toggleHighlighter(item);
  };

  useEffect(() => {
    if (Location.pathname === link.url.myRequest) {
      toggleHighlighter(null);
    }
  }, [Location]);

  const toggleHighlighter = useCallback((item) => {
    setHighlighter(item);
  });

  return (
    <>
      {user &&
        <div className='aSideContainer'>
          <aside className="sidebar">
            <nav className="sidebar-nav">
              {["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"].includes(role) &&
                <a
                  className={`nav-item ${Highlighter === "product" ? "nav-active" : ""}`}
                  onClick={(e) => {
                    handleStyle(e, "product");
                    Navigate(link.url.listofProduct);
                  }}>
                  <Package className="lucide-icon nav-icon" size={24} />
                  Product
                </a>
              }
              {["ADMIN", "MANAGER", "SUPERVISOR"].includes(role) &&
                <a
                  className={`nav-item ${Highlighter === "employee" ? "nav-active" : ""}`}
                  onClick={(e) => {
                    handleStyle(e, "employee");
                    Navigate(link.url.listofEmployee);
                  }}>
                  <FileUser className="lucide-icon nav-icon" size={24} />
                  Employee
                </a>
              }
              {["ADMIN", "MANAGER", "SUPERVISOR"].includes(role) &&
                <a
                  className={`nav-item ${Highlighter === "request" ? "nav-active" : ""}`}
                  onClick={(e) => {
                    handleStyle(e, "request");
                    Navigate(link.url.requestEmployee);
                  }}>
                  <HelpCircle className="lucide-icon nav-icon" size={24} />
                  Employee Request
                </a>
              }
            </nav>
          </aside>
        </div >
      }
    </>
  );
}

export default LeftSliter;
