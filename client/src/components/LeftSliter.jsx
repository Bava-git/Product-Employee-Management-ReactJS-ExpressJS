import { FileUser, HelpCircle, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const Location = useLocation();
  let userType = useAuth();
  const auth = JSON.parse(sessionStorage.getItem("token")) || "";
  const [style, setStyle, resetStyle] = useSessionStorage("style", { aSideBar: null });
  const [Highlighter, setHighlighter] = useState(style.aSideBar);

  const handleStyle = (e, item) => {
    e.preventDefault();
    setStyle(prev => ({
      ...prev,
      aSideBar: item
    }));
    setHighlighter(item);
  };

  useEffect(() => {

    if (Location.pathname === link.url.myRequest) {
      setHighlighter(null);
      resetStyle();
    }

  }, [Location])


  return (
    <>
      {auth &&
        <div className='aSideContainer'>
          <aside className="sidebar">
            <nav className="sidebar-nav">
              <a
                className={`nav-item ${Highlighter === "product" ? "nav-active" : ""}`}
                onClick={(e) => {
                  handleStyle(e, "product");
                  Navigate(link.url.listofProduct);
                }}>
                <Package className="lucide-icon nav-icon" size={24} />
                Product
              </a>
              <a
                className={`nav-item ${Highlighter === "employee" ? "nav-active" : ""}`}
                onClick={(e) => {
                  handleStyle(e, "employee");
                  Navigate(link.url.listofEmployee);
                }}>
                <FileUser className="lucide-icon nav-icon" size={24} />
                Employee
              </a>
              <a
                className={`nav-item ${Highlighter === "request" ? "nav-active" : ""}`}
                onClick={(e) => {
                  handleStyle(e, "request");
                  Navigate(link.url.requestEmployee);
                }}>
                <HelpCircle className="lucide-icon nav-icon" size={24} />
                Employee Request
              </a>
            </nav>
          </aside>
        </div >
      }
    </>
  );
}

export default LeftSliter;
