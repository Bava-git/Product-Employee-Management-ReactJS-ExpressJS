import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

// CSS
import './App.css';
import './assets/css/credential.css';
import './assets/css/Employee.css';
import './assets/css/Home_Page.css';
import './assets/css/LeftSliter.css';
import './assets/css/Nav-Bar.css';
import './assets/css/Product.css';
import './assets/css/Request.css';

// General
import * as url from './components/utilities/urlController';

// General
import Fooder from './components/Fooder';
import HomePage from './components/HomePage';
import LeftSliter from './components/LeftSliter';
import Nav from "./components/Nav";
import PrivateComponent from './PrivateComponent';

// Product
import Product_Dashboard from './components/product/Product_Dashboard';
import Product_Modifer from './components/product/Product_Modifer';

// Employee
import Employee_Dashboard from './components/employee/Employee_Dashboard';
import Employee_Login from './components/employee/Employee_Login';
import Employee_Modifer from './components/employee/Employee_Modifer';

// Request
import Request_ManagerSide from './components/request/Request_ManagerSide';
import Request_New from './components/request/Request_New';
import Request_Status from './components/request/Request_Status';

import Test from './components/TestScreen';




function App() {

  return (
    <>
      <Toaster expand={true} richColors position='top-right' duration={2000} />
      <BrowserRouter>
        <Nav />
        <LeftSliter />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={url.EmployeeLogin} element={<Employee_Login />} />
          <Route path='/*' element={<Page404 />} />

          <Route element={<PrivateComponent allowedRoles={["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]} />}>
            <Route path={url.listofProduct} element={<Product_Dashboard />} />
            <Route path={url.addProduct} element={<Product_Modifer />} />
            <Route path={url.request} element={<Request_New />} />
            <Route path={url.requestStatus} element={<Request_Status />} />
          </Route>

          <Route element={<PrivateComponent allowedRoles={["ADMIN", "MANAGER", "SUPERVISOR"]} />}>
            <Route path="/add-product/:id" element={<Product_Modifer />} />
            <Route path={url.listofEmployee} element={<Employee_Dashboard />} />
            <Route path={url.addEmployee} element={<Employee_Modifer />} />
            <Route path="/add-employee/:id" element={<Employee_Modifer />} />
            <Route path={url.requestEmployee} element={<Request_ManagerSide />} />
          </Route>

          <Route element={<PrivateComponent allowedRoles={["ADMIN"]} />}>
            <Route path='/test' element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Fooder />
    </>
  )
}

export default App

function Page404() {
  return (
    <p className='page404'>404 Page not found</p>
  )
}
