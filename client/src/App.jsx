import { jwtDecode } from 'jwt-decode';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthContext } from './AuthContext';
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// CSS
import './App.css';
import './assets/css/credential.css';
import './assets/css/Employee.css';
import './assets/css/Home_Page.css';
import './assets/css/LeftSliter.css';
import './assets/css/Nav-Bar.css';
import './assets/css/Product.css';
import './assets/css/Request.css';
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// General
import * as url from './components/utilities/urlController';
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// General
import HomePage from './components/HomePage';
import LeftSliter from './components/LeftSliter';
import Nav from "./components/Nav";
import PrivateComponent from './PrivateComponent';
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// Product
const Product_Modifer = lazy(() => import('./components/modifier/Product_Modifer'));
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// Employee
const Employee_Login = lazy(() => import('./components/employee/Employee_Login'));
const Employee_Modifer = lazy(() => import('./components/modifier/Employee_Modifer'));
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// Request
const Request_ManagerSide = lazy(() => import('./components/request/Request_ManagerSide'));
const Request_New = lazy(() => import('./components/request/Request_New'));
const Request_Status = lazy(() => import('./components/request/Request_Status'));
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
const ProductList = lazy(() => import('./components/Dashboard').then(module => ({ default: module.ProductList })));
const EmployeeList = lazy(() => import('./components/Dashboard').then(module => ({ default: module.EmployeeList })));
const RequestList = lazy(() => import('./components/Dashboard').then(module => ({ default: module.RequestList })));
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
import TestScreen from './components/TestScreen';

function App() {

  const token = sessionStorage.getItem("token");
  let decoded = null;

  try {
    decoded = token ? jwtDecode(token) : null;
  } catch {
    decoded = null;
  }

  return (
    <>
      <Toaster expand={true} richColors position='top-right' duration={2000} />
      <AuthContext.Provider value={{ role: decoded?.role, id: decoded?.id }}>
        <BrowserRouter>
          <Nav />
          <LeftSliter />
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path={url.EmployeeLogin} element={<Employee_Login />} />
              <Route path='/*' element={<Page404 />} />
              <Route path='/testscreen' element={<TestScreen />} />

              <Route element={<PrivateComponent allowedRoles={["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]} />}>
                <Route path={url.listofProduct} element={<ProductList />} />
                <Route path={url.addProduct} element={<Product_Modifer />} />
                <Route path={url.request} element={<Request_New />} />
                <Route path={url.requestStatus} element={<Request_Status />} />
              </Route>

              <Route element={<PrivateComponent allowedRoles={["ADMIN", "MANAGER", "SUPERVISOR"]} />}>
                <Route path="/add-product/:id" element={<Product_Modifer />} />
                <Route path={url.listofEmployee} element={<EmployeeList />} />
                <Route path={url.addEmployee} element={<Employee_Modifer />} />
                <Route path="/add-employee/:id" element={<Employee_Modifer />} />
                <Route path={url.requestEmployee} element={<RequestList />} />
              </Route>

            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App

function Page404() {
  return (
    <div className="page404Div">
      <h1>404 - Page not found</h1>
    </div>
  )
};

const LoadingScreen = () => {
  return (
    <main className="main-container">
      <div className='loadingScreenDiv'>
        <h1>Loading...</h1>
      </div>
    </main>
  );
};
