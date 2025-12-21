import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuth } from "./AuthContext";
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// CSS
import "./App.css";
import "./assets/css/credential.css";
import "./assets/css/Employee.css";
import "./assets/css/Home_Page.css";
import "./assets/css/LeftSliter.css";
import "./assets/css/LoadingScreen.css";
import "./assets/css/Nav-Bar.css";
import "./assets/css/NotFound.css";
import "./assets/css/Product.css";
import "./assets/css/Request.css";
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// General
import * as url from "./components/utilities/urlController";
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// General
import HomePage from "./components/HomePage";
import LeftSliter from "./components/LeftSliter";
import Nav from "./components/Nav";
import PrivateComponent from "./PrivateComponent";
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// Lazy when required
const NotFound = lazy(() => import("./components/NotFound"));
const LoadingScreen = lazy(() => import("./components/LoadingScreen"));
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// Modifier
const Product_Modifer = lazy(() =>
  import("./components/modifier/Product_Modifer")
);
const Employee_Modifer = lazy(() =>
  import("./components/modifier/Employee_Modifer")
);
const Request_Modifier = lazy(() =>
  import("./components/modifier/Request_Modifier")
);
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// Employee Log-in
const Employee_Login = lazy(() =>
  import("./components/credentials/Employee_Login")
);
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// List
const ProductList = lazy(() =>
  import("./components/Dashboard").then((module) => ({
    default: module.ProductList,
  }))
);
const EmployeeList = lazy(() =>
  import("./components/Dashboard").then((module) => ({
    default: module.EmployeeList,
  }))
);
const EmployeeRequestList = lazy(() =>
  import("./components/Dashboard").then((module) => ({
    default: module.EmployeeRequestList,
  }))
);
const MyRequestList = lazy(() =>
  import("./components/Dashboard").then((module) => ({
    default: module.MyRequestList,
  }))
);
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

function App() {
  const { user } = useAuth();

  return (
    <div className={`app-layout ${user ? "" : "no-sidebar"}`}>
      <Toaster expand={true} richColors position="top-right" duration={2000} />
      <Nav />
      <LeftSliter />
      <div className="content">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={url.EmployeeLogin} element={<Employee_Login />} />
            <Route path="/loadscreen" element={<LoadingScreen />} />
            <Route path="/*" element={<NotFound />} />

            <Route
              element={
                <PrivateComponent
                  allowedRoles={["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]}
                />
              }
            >
              <Route path={url.listofProduct} element={<ProductList />} />
              <Route path={url.addProduct} element={<Product_Modifer />} />
              <Route path={url.newRequest} element={<Request_Modifier />} />
              <Route path={url.myRequest} element={<MyRequestList />} />
            </Route>

            <Route
              element={
                <PrivateComponent
                  allowedRoles={["ADMIN", "MANAGER", "SUPERVISOR"]}
                />
              }
            >
              <Route path="/add-product/:id" element={<Product_Modifer />} />
              <Route path={url.listofEmployee} element={<EmployeeList />} />
              <Route path={url.addEmployee} element={<Employee_Modifer />} />
              <Route path="/add-employee/:id" element={<Employee_Modifer />} />
              <Route
                path={url.requestEmployee}
                element={<EmployeeRequestList />}
              />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
