import { FileUser, HelpCircle, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
import { useAuth } from "../AuthContext";
import link from "./utilities/exportor";
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------

function LeftSliter() {
  const Navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role;
  const Location = useLocation();
  const [Highlighter, setHighlighter] = useState(Location.pathname);

  useEffect(() => {
    let pathname = Location.pathname;
    setHighlighter(pathname);
  }, [Location]);

  return (
    <>
      {user && (
        <div className="aSideContainer">
          <aside className="sidebar">
            <nav className="sidebar-nav">
              {["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"].includes(role) && (
                <a
                  data-testid="left-aside-product"
                  className={`nav-item ${
                    Highlighter === "/products" ? "nav-active" : ""
                  }`}
                  onClick={(e) => {
                    Navigate(link.url.listofProduct);
                  }}
                >
                  <Package className="lucide-icon nav-icon" size={24} />
                  <span>Product</span>
                </a>
              )}
              {["ADMIN", "MANAGER", "SUPERVISOR"].includes(role) && (
                <a
                  data-testid="left-aside-employee"
                  className={`nav-item ${
                    Highlighter === "/employees" ? "nav-active" : ""
                  }`}
                  onClick={(e) => {
                    Navigate(link.url.listofEmployee);
                  }}
                >
                  <FileUser className="lucide-icon nav-icon" size={24} />
                  <span>Employee</span>
                </a>
              )}
              {["ADMIN", "MANAGER", "SUPERVISOR"].includes(role) && (
                <a
                  data-testid="left-aside-request"
                  className={`nav-item ${
                    Highlighter === "/request" ? "nav-active" : ""
                  }`}
                  onClick={(e) => {
                    Navigate(link.url.requestEmployee);
                  }}
                >
                  <HelpCircle className="lucide-icon nav-icon" size={24} />
                  <span>Employee Request</span>
                </a>
              )}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

export default LeftSliter;
