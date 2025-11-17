import { jwtDecode } from 'jwt-decode';
import { FileUser, HelpCircle, Package } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
import link from './utilities/exportor';
import { useAuth } from '../AuthContext';
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------

function useSessionStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const saved = sessionStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function LeftSliter() {

  const Navigate = useNavigate();
  let userType = useAuth();
  const auth = JSON.parse(sessionStorage.getItem("token")) || "";
  const [style, setStyle] = useSessionStorage("style", { aSideBar: null });
  const [Highlighter, setHighlighter] = useState(style.aSideBar);


  const handleStyle = (e, item) => {
    e.preventDefault();
    setStyle(prev => ({
      ...prev,
      aSideBar: item
    }));
    setHighlighter(item);
  };


  return (
    <>
      {auth && <div className='aSideContainer'>
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
              Request
            </a>
            <a
              className={`nav-item ${Highlighter === "newrequest" ? "nav-active" : ""}`}
              onClick={(e) => {
                handleStyle(e, "newrequest");
                Navigate(link.url.request);
              }}>
              <HelpCircle className="lucide-icon nav-icon" size={24} />
              New Request
            </a>
          </nav>
        </aside>
      </div >}
    </>
  );
}

export default LeftSliter;
