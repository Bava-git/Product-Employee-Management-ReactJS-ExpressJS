import { Pencil, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
//  ----------------------------------------------------
//  ----------------------------------------------------
import userIcon from '../assets/icon/user.png';
import { useAuth } from '../AuthContext';
import link from './utilities/exportor';
//  ----------------------------------------------------
//  ----------------------------------------------------

export function ProductList() {

  const Navigate = useNavigate();
  const [TableData, setTableData] = useState([]);
  const [RawData, setRawData] = useState([]);
  const [CountOfItem, setCountOfItem] = useState(0);
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    link.api.List("products").then(data => {
      setRawData(data);
    });
  }, [refresh]);

  const handleDelete = (id) => {
    link.api.Delete("products", id).then(status => {
      if (status === 200) {
        toast.success("Deleted succussfully");
        setrefresh(!refresh);
      }
    });
  };

  return (
    <main className="main-area">
      <div className="content-area">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Product Inventory Overview</h1>
            <div className="header-links">
              <a className="header-link" href={link.url.listofProduct}>Home</a>
              <a className="header-link" href={link.url.addProduct}>Add Product</a>
            </div>
          </div>
          <div className="table-responsive">
            <table className="product-table">
              <thead className="table-head">
                <tr>
                  <th className="table-th" scope="col">S.No</th>
                  <th className="table-th" scope="col">Name</th>
                  <th className="table-th" scope="col">Price</th>
                  <th className="table-th" scope="col">Color</th>
                  <th className="table-th" scope="col">Height/Length/Width</th>
                  <th className="table-th" scope="col">Quantity</th>
                  <th className="table-th action-th" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {TableData?.length ?
                  (TableData.map((product, index) => (
                    <tr key={product._id} className="table-row">
                      <td className="table-td-id">{index + 1}</td>
                      <td className="table-td">{product.productName}</td>
                      <td className="table-td">{product.productPrice}</td>
                      <td className="table-td">{product.productColour}</td>
                      <td className="table-td">{product.productHeight + " x " + product.productLength + " x " + product.productWidth}</td>
                      <td className="table-td">{product.productLength}</td>
                      <td className="table-td">
                        <div className="action-buttons">
                          <button className="action-btn download-btn" onClick={() => Navigate("/add-product/" + product._id)}>
                            <Pencil className='actionLucideIcon' />
                          </button>
                          <button className="action-btn delete-btn" onClick={() => { handleDelete(product._id) }}>
                            <Trash2 className='actionLucideIcon' />
                          </button>
                        </div>
                      </td>
                    </tr>)))
                  :
                  (<tr><td colSpan="12" className='errorintable'>No records found</td></tr>)
                }
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <span className="footer-text">Showing 1 to 10 of {CountOfItem} results</span>
            <Pagenation data={RawData} ItemPerPage={10} setTableData={setTableData} setCountOfItem={setCountOfItem} />
          </div>
        </div>
      </div>
    </main>
  )
}

export function EmployeeList() {

  const Navigate = useNavigate();
  const [TableData, setTableData] = useState([]);
  const [RawData, setRawData] = useState([]);
  const [CountOfItem, setCountOfItem] = useState(0);
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    link.api.List("employees").then(data => { setRawData(data) });
  }, [refresh]);

  const handleDelete = (id) => {
    link.api.Delete("employees", id).then(status => {
      if (status === 200) {
        toast.success("Deleted succussfully");
        setrefresh(!refresh);
      }
    });
  };

  return (
    <main className="main-area">
      <div className="content-area">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Employees</h1>
            <div className="header-links">
              <a className="header-link" href={link.url.listofEmployee}>Home</a>
              <a className="header-link" href={link.url.addEmployee}>New Recruit</a>
            </div>
          </div>
          <div className="table-responsive">
            <table className="product-table">
              <thead className="table-head">
                <tr>
                  <th className="table-th" scope="col">S.No</th>
                  <th className="table-th" scope="col">Employee Name</th>
                  <th className="table-th" scope="col">Gender</th>
                  <th className="table-th" scope="col">Email</th>
                  <th className="table-th" scope="col">Phone Number</th>
                  <th className="table-th" scope="col">Department</th>
                  <th className="table-th" scope="col">Acc type</th>
                  <th className="table-th action-th" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {TableData?.length ?
                  (TableData.map((employee, index) => (
                    <tr key={employee._id} className="table-row">
                      <td className="table-td-id">{index + 1}</td>
                      <td className="table-td">{employee.employeeName}</td>
                      <td className="table-td">{employee.employeeGender}</td>
                      <td className="table-td">{employee.employeeEmailid}</td>
                      <td className="table-td">{employee.employeePhonenum}</td>
                      <td className="table-td">{employee.employeeDepartment}</td>
                      <td className="table-td">{employee.employeeAccounttype}</td>
                      <td className="table-td">
                        <div className="action-buttons">
                          <button className="action-btn download-btn" onClick={() => Navigate("/add-employee/" + employee._id)}>
                            <Pencil className='actionLucideIcon' />
                          </button>
                          <button className="action-btn delete-btn" onClick={() => { handleDelete(employee._id) }}>
                            <Trash2 className='actionLucideIcon' />
                          </button>
                        </div>
                      </td>
                    </tr>)))
                  :
                  (<tr><td colSpan="12" className='errorintable'>No records found</td></tr>)
                }
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <span className="footer-text">Showing 1 to 10 of {CountOfItem} results</span>
            <Pagenation data={RawData} ItemPerPage={10} setTableData={setTableData} setCountOfItem={setCountOfItem} />
          </div>
        </div>
      </div>
    </main>
  )
}

export function RequestList() {

  const Navigate = useNavigate();
  const [oldRequest, setOldRequest] = useState([]);
  const [newRequest, setNewRequest] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [viewScreen, setViewScreen] = useState(false);
  const { role } = useAuth();
  const [RawData, setRawData] = useState([]);
  const [CountOfItem, setCountOfItem] = useState(0);

  useEffect(() => {
    link.api.List("requests")
      .then(data => {
        const filteredData = data.filter(item => item.requesterPosition !== role);
        const oldData = filteredData.filter(item => item.requestStatus !== "Pending");
        const newData = filteredData.filter(item => item.requestStatus === "Pending");

        setOldRequest(oldData);
        setNewRequest(newData);
      });
  }, []);

  useEffect(() => {
    if (!viewScreen && newRequest.length > 0) {
      setRawData(newRequest);
    }
  }, [newRequest, viewScreen]);

  useEffect(() => {
    if (viewScreen && oldRequest.length > 0) {
      setRawData(oldRequest);
    }
  }, [oldRequest, viewScreen]);


  const changeStatus = (id, Status) => {
    let sendStatus = { requestStatus: Status };
    link.api.Update("requests/update", id, sendStatus).then(status => {
      if (status === 200) {
        toast.success("Processed successfully");
        fetchData();
      }
    })
  };

  return (
    <main className="main-area">
      <div className="content-area">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Requests</h1>
            <div className="header-links">
              <a className="header-link" onClick={() => setViewScreen(!viewScreen)}>{!viewScreen ? "Requests History" : "New Requests"}</a>
            </div>
          </div>
          <div className="table-responsive">
            <table className="product-table">
              <thead className="table-head">
                <tr>
                  <th className="table-th" scope="col">S.No</th>
                  <th className="table-th" scope="col">Employee</th>
                  <th className="table-th" scope="col">Department</th>
                  <th className="table-th" scope="col">Request Description</th>
                  <th className="table-th action-th" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {TableData?.length != 0 ?
                  (TableData.map((request, index) => (
                    <tr key={request._id} className="table-row">
                      <td className="table-td-id">{index + 1}</td>
                      <td className="table-td">
                        <div className='request-requesterName'>
                          <img className='request-employeeProfile' src={userIcon} alt="profile" />
                          <div>
                            <span>{request.requesterName}</span>
                            <span>{request.Userid}</span>
                          </div>
                        </div>
                      </td>
                      <td className="table-td">{request.requesterDepartment}</td>
                      <td className="table-td">
                        <div className='request-requestDescription'>
                          <span><strong>Subject:</strong> {request.requestType || request.requestTitle}</span>
                          <div>
                            <span><strong>From:</strong> {moment(request.requestFromDate).format("DD-MMM-YYYY")} </span>
                            <span><strong>To:</strong> {moment(request.requestEndDate).format("DD-MMM-YYYY")}</span>
                          </div>
                          <span><strong>Description:</strong></span>
                          <span>{request.requestDescription}</span>
                        </div>
                      </td>
                      <td className="table-td">
                        {request.requestStatus === "Pending" ?
                          (<div className="action-buttons">
                            <button className="commonButton" onClick={() => { changeStatus(request._id, "Approved") }}>
                              Approved
                            </button>
                            <button className="redButton" onClick={() => { changeStatus(request._id, "Rejected") }}>
                              Rejected
                            </button>
                          </div>)
                          :
                          (<span className={request?.requestStatus === "Approved" ? "approvedStatus" : "rejectedStatus"}>{request?.requestStatus}</span>)
                        }
                      </td>
                    </tr>)))
                  :
                  (<tr><td colSpan="12" className='errorintable'>No records found</td></tr>)
                }
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <span className="footer-text">Showing 1 to 10 of {CountOfItem} results</span>
            <Pagenation data={RawData} ItemPerPage={10} setTableData={setTableData} setCountOfItem={setCountOfItem} />
          </div>
        </div>
      </div>
    </main>
  )
}


const Pagenation = ({ data, ItemPerPage, setTableData, setCountOfItem }) => {

  let CurrentPage = 0;
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    loadPage(data, 0);
    setCountOfItem(data?.length ?? 0);
  }, [data, ItemPerPage]);

  const loadPage = (data, pageno) => {

    if (data?.length === 0) {
      return;
    } else if (data?.length <= 10) {
      setTableData(data);
      return;
    }

    let NoOfPages = Math.ceil(data?.length / ItemPerPage);
    if (NoOfPages <= 0) {
      pageno = 0
    } else if (pageno >= NoOfPages) {
      pageno = NoOfPages - 1;
    }
    let startIndex = pageno * ItemPerPage;
    let EndIndex = startIndex + ItemPerPage;
    setTableData(data.slice(startIndex, EndIndex));
    pagenation(data)
  }

  const pagenation = (data) => {
    let NoOfPages = Math.ceil(data.length / ItemPerPage);
    const allButtons = [
      <a key="previous" className='pagination-item' onClick={() => {
        if (CurrentPage === 0) {
          return;
        }
        CurrentPage--;
        loadPage(data, CurrentPage);
      }}>Previous</a>,
      <a key="first" className={CurrentPage === 0 ? "pagination-item pagination-active" : "pagination-item"} onClick={() => {
        CurrentPage = 0;
        loadPage(data, CurrentPage);
      }
      }> First</a>,
    ];
    for (let i = 2; i < NoOfPages; i++) {
      allButtons.push(
        <a key={i} className={CurrentPage === (i - 1) ? "pagination-item pagination-active" : "pagination-item"} onClick={() => {
          CurrentPage = (i - 1);
          loadPage(data, (i - 1));
        }}>{i}</a>);
    }
    allButtons.push(
      <a key="last" className={CurrentPage === (NoOfPages - 1) ? "pagination-item pagination-active" : "pagination-item"} onClick={() => {
        CurrentPage = NoOfPages - 1
        loadPage(data, (NoOfPages - 1));
      }}>Last</a>,
      <a key="next" className='pagination-item' onClick={() => {
        if (CurrentPage === (NoOfPages - 1)) {
          return;
        }
        CurrentPage++;
        loadPage(data, CurrentPage);
      }}>Next</a>,
    );
    setButtons(allButtons);
  };

  return (
    <nav className="pagination">
      {buttons}
    </nav>
  )

};