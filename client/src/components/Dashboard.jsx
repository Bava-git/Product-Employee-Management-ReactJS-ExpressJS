import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
//  ----------------------------------------------------
//  ----------------------------------------------------
import userIcon from "../assets/icon/user.png";
import { useAuth } from "../AuthContext";
import { Pagenation } from "../components/utilities/reusables";
import link from "./utilities/exportor";
//  ----------------------------------------------------
//  ----------------------------------------------------

export function ProductList() {
  const Navigate = useNavigate();
  const [TableData, setTableData] = useState([]);
  const [RawData, setRawData] = useState([]);
  const [CountOfItem, setCountOfItem] = useState(0);
  const [refresh, setrefresh] = useState(false);
  const { user } = useAuth();
  const role = user?.role;

  useEffect(() => {
    link.api.List("products").then((data) => {
      setRawData(data);
    });
  }, [refresh]);

  const handleDelete = (id) => {
    link.api.Delete("products", id).then((status) => {
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
              <a className="header-link" href={link.url.listofProduct}>
                Home
              </a>
              <a className="header-link" href={link.url.addProduct}>
                Add Product
              </a>
            </div>
          </div>
          <div className="table-responsive">
            <table className="product-table">
              <thead className="table-head">
                <tr>
                  <th className="table-th" scope="col">
                    S.No
                  </th>
                  <th className="table-th" scope="col">
                    Name
                  </th>
                  <th className="table-th" scope="col">
                    Price
                  </th>
                  <th className="table-th" scope="col">
                    Color
                  </th>
                  <th className="table-th" scope="col">
                    Height/Length/Width
                  </th>
                  <th className="table-th" scope="col">
                    Quantity
                  </th>
                  <th className="table-th action-th" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {TableData?.length ? (
                  TableData.map((product, index) => (
                    <tr key={product._id} className="table-row">
                      <td className="table-td-id">{index + 1}</td>
                      <td
                        className="table-td"
                        data-testid={`product-${index + 1}`}
                      >
                        {product.productName}
                      </td>
                      <td className="table-td">{product.productPrice}</td>
                      <td className="table-td">{product.productColour}</td>
                      <td className="table-td">
                        {product.productHeight +
                          " x " +
                          product.productLength +
                          " x " +
                          product.productWidth}
                      </td>
                      <td className="table-td">{product.productLength}</td>
                      <td className="table-td">
                        <div className="action-buttons">
                          <button
                            id="bn-edit"
                            data-testid={`edit-product-${product.productName}-${
                              index + 1
                            }`}
                            className="action-btn download-btn"
                            onClick={() =>
                              Navigate("/add-product/" + product._id)
                            }
                          >
                            <Pencil className="actionLucideIcon" />
                          </button>
                          {["ADMIN", "MANAGER", "SUPERVISOR"].includes(
                            role
                          ) && (
                            <button
                              id="bn-delete"
                              data-testid={`delete-product-${
                                product.productName
                              }-${index + 1}`}
                              className="action-btn delete-btn"
                              onClick={() => {
                                handleDelete(product._id);
                              }}
                            >
                              <Trash2 className="actionLucideIcon" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="errorintable">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <div>
              <span className="footer-text">Showing 1 to 10 of </span>
              <span className="footer-text" data-testid="pagination-count">
                {CountOfItem}
              </span>
              <span className="footer-text"> results</span>
            </div>
            <Pagenation
              data={RawData}
              ItemPerPage={10}
              setTableData={setTableData}
              setCountOfItem={setCountOfItem}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export function EmployeeList() {
  const Navigate = useNavigate();
  const [TableData, setTableData] = useState([]);
  const [RawData, setRawData] = useState([]);
  const [CountOfItem, setCountOfItem] = useState(0);
  const { user } = useAuth();
  const role = user?.role;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    link.api.GetOne("employees/by", role).then((data) => {
      setRawData(data);
    });
  };

  const handleMongodbDelete = (id) => {
    link.api.Delete("employees", id).then((status) => {
      if (status === 200) {
        toast.success("Deleted succussfully");
        fetchData();
      }
    });
  };

  const token = JSON.parse(sessionStorage.getItem("token"));
  const handleMysqlDelete = async (employeeId) => {
    await axios
      .delete(`http://localhost:3000/user/employeedelete/${employeeId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .catch((ERR) => console.log(ERR));
  };

  return (
    <main className="main-area">
      <div className="content-area">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Employees</h1>
            {["ADMIN", "MANAGER"].includes(role) && (
              <div className="header-links">
                <a className="header-link" href={link.url.listofEmployee}>
                  Home
                </a>
                <a className="header-link" href={link.url.addEmployee}>
                  New Recruit
                </a>
              </div>
            )}
          </div>
          <div className="table-responsive">
            <table className="product-table">
              <thead className="table-head">
                <tr>
                  <th className="table-th" scope="col">
                    S.No
                  </th>
                  <th className="table-th" scope="col">
                    Employee Name
                  </th>
                  <th className="table-th" scope="col">
                    Gender
                  </th>
                  <th className="table-th" scope="col">
                    Email
                  </th>
                  <th className="table-th" scope="col">
                    Phone Number
                  </th>
                  <th className="table-th" scope="col">
                    Department
                  </th>
                  <th className="table-th" scope="col">
                    Position
                  </th>
                  {["ADMIN"].includes(role) && (
                    <>
                      <th className="table-th action-th" scope="col">
                        Action
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {TableData?.length ? (
                  TableData.map((employee, index) => (
                    <tr key={employee._id} className="table-row">
                      <td className="table-td-id">{index + 1}</td>
                      <td className="table-td">{employee.employeeName}</td>
                      <td className="table-td">{employee.employeeGender}</td>
                      <td className="table-td">{employee.employeeEmailid}</td>
                      <td className="table-td">{employee.employeePhonenum}</td>
                      <td className="table-td">
                        {employee.employeeDepartment}
                      </td>
                      <td className="table-td">{employee.employeePosition}</td>
                      {["ADMIN"].includes(role) && (
                        <>
                          <td className="table-td">
                            <div className="action-buttons">
                              <button
                                id="bn-edit"
                                data-testid={`edit-employee-${employee.employeeName.trim()}`}
                                className="action-btn download-btn"
                                onClick={() =>
                                  Navigate("/add-employee/" + employee._id)
                                }
                              >
                                <Pencil className="actionLucideIcon" />
                              </button>
                              <button
                                id="bn-delete"
                                data-testid={`delete-employee-${employee.employeeName.trim()}`}
                                className="action-btn delete-btn"
                                onClick={() => {
                                  handleMongodbDelete(employee._id);
                                  handleMysqlDelete(employee.employeeId);
                                }}
                              >
                                <Trash2 className="actionLucideIcon" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="errorintable">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <div>
              <span className="footer-text">Showing 1 to 10 of </span>
              <span className="footer-text" data-testid="pagination-count">
                {CountOfItem}
              </span>
              <span className="footer-text"> results</span>
            </div>
            <Pagenation
              data={RawData}
              ItemPerPage={10}
              setTableData={setTableData}
              setCountOfItem={setCountOfItem}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export function EmployeeRequestList() {
  const [oldRequest, setOldRequest] = useState([]);
  const [newRequest, setNewRequest] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [viewScreen, setViewScreen] = useState(false);
  const { user } = useAuth();
  const role = user?.role;
  const [RawData, setRawData] = useState([]);
  const [CountOfItem, setCountOfItem] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    link.api.GetOne("requests/by", role).then((data) => {
      const oldData = data.filter((item) => item.requestStatus !== "Pending");
      const newData = data.filter((item) => item.requestStatus === "Pending");
      setOldRequest(oldData);
      setNewRequest(newData);
    });
  };

  useEffect(() => {
    if (!viewScreen) {
      setTableData([]);
      setRawData(newRequest);
    }
  }, [newRequest, viewScreen]);

  useEffect(() => {
    if (viewScreen) {
      setTableData([]);
      setRawData(oldRequest);
    }
  }, [oldRequest, viewScreen]);

  const [showPopup, setShowPopup] = useState(false);
  const changeStatus = (id, Status) => {
    let sendStatus = { requestStatus: Status };
    link.api.Update("requests/update", id, sendStatus).then((status) => {
      if (status === 200) {
        toast.success("Processed successfully");
        fetchData();
      }
    });
  };

  const handleChangeStatus = () => {
    console.log("Passed");
  };

  return (
    <main className="main-area">
      <div className="content-area">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">
              {viewScreen
                ? "Employee Requests History"
                : "New Employee Requests"}
            </h1>
            <div className="header-links">
              <a
                className="header-link"
                onClick={() => setViewScreen(!viewScreen)}
              >
                {!viewScreen ? "Requests History" : "New Requests"}
              </a>
            </div>
          </div>
          <div className="table-responsive">
            <table className="product-table">
              <thead className="table-head">
                <tr>
                  <th className="table-th" scope="col">
                    S.No
                  </th>
                  <th className="table-th" scope="col">
                    Employee
                  </th>
                  <th className="table-th" scope="col">
                    Department
                  </th>
                  <th className="table-th" scope="col">
                    Request Description
                  </th>
                  <th className="table-th action-th" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {TableData?.length != 0 ? (
                  TableData.map((request, index) => (
                    <tr key={request._id} className="table-row">
                      <td className="table-td-id">{index + 1}</td>
                      <td
                        className="table-td"
                        data-testid={`request-${index + 1}`}
                      >
                        <div className="request-requesterName">
                          <img
                            className="request-employeeProfile"
                            src={userIcon}
                            alt="profile"
                          />
                          <div>
                            <span>{request.requesterName}</span>
                            <span>{request.Userid}</span>
                          </div>
                        </div>
                      </td>
                      <td className="table-td">
                        {request.requesterDepartment}
                      </td>
                      <td className="table-td">
                        <div className="request-requestDescription">
                          <span>
                            <strong>Subject:</strong>{" "}
                            {request.requestType || request.requestTitle}
                          </span>
                          <div>
                            <span>
                              <strong>From:</strong>{" "}
                              {moment(request.requestFromDate).format(
                                "DD-MMM-YYYY"
                              )}{" "}
                            </span>
                            <span>
                              <strong>To:</strong>{" "}
                              {moment(request.requestEndDate).format(
                                "DD-MMM-YYYY"
                              )}
                            </span>
                          </div>
                          <span>
                            <strong>Description:</strong>
                          </span>
                          <span>{request.requestDescription}</span>
                        </div>
                      </td>
                      <td className="table-td">
                        {request.requestStatus === "Pending" ? (
                          <div className="action-buttons">
                            <button
                              data-testid={`bn-approve${index + 1}`}
                              className="commonButton"
                              onClick={() => {
                                changeStatus(request._id, "Approved");
                              }}
                            >
                              Approved
                            </button>
                            <button
                              data-testid={`bn-reject${index + 1}`}
                              className="redButton"
                              onClick={() => {
                                changeStatus(request._id, "Rejected");
                              }}
                            >
                              Rejected
                            </button>
                          </div>
                        ) : (
                          <span
                            className={
                              request?.requestStatus === "Approved"
                                ? "approvedStatus"
                                : "rejectedStatus"
                            }
                          >
                            {request?.requestStatus}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="errorintable">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <div>
              <span className="footer-text">Showing 1 to 5 of </span>
              <span className="footer-text" data-testid="pagination-count">
                {CountOfItem}
              </span>
              <span className="footer-text"> results</span>
            </div>
            <Pagenation
              data={RawData}
              ItemPerPage={5}
              setTableData={setTableData}
              setCountOfItem={setCountOfItem}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export function MyRequestList() {
  //  ----------------------------------------------------
  //  ----------------------------------------------------
  const [oldRequest, setOldRequest] = useState([]);
  const [newRequest, setNewRequest] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [viewScreen, setViewScreen] = useState(false);
  const { user } = useAuth();
  const [RawData, setRawData] = useState([]);
  const [CountOfItem, setCountOfItem] = useState(0);
  //  ----------------------------------------------------
  //  ----------------------------------------------------

  useEffect(() => {
    link.api.GetOne("requests", user?.id).then((data) => {
      const oldData = data.filter((item) => item.requestStatus !== "Pending");
      const newData = data.filter((item) => item.requestStatus === "Pending");

      setOldRequest(oldData);
      setNewRequest(newData);
    });
  }, []);

  useEffect(() => {
    if (!viewScreen) {
      setTableData([]);
      setRawData(newRequest);
    }
  }, [newRequest, viewScreen]);

  useEffect(() => {
    if (viewScreen) {
      setTableData([]);
      setRawData(oldRequest);
    }
  }, [oldRequest, viewScreen]);

  return (
    <main className="main-area">
      <div className="content-area">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">
              {viewScreen ? "History" : "My Request Status"}
            </h1>
            <div className="header-links">
              <a className="header-link" href={link.url.newRequest}>
                New
              </a>
              <a
                className="header-link"
                onClick={() => setViewScreen(!viewScreen)}
              >
                {!viewScreen ? "History" : "Pending"}
              </a>
            </div>
          </div>
          <div className="table-responsive">
            <table className="product-table">
              <thead className="table-head">
                <tr>
                  <th className="table-th" scope="col">
                    S.No
                  </th>
                  <th className="table-th" scope="col">
                    Employee
                  </th>
                  <th className="table-th" scope="col">
                    Department
                  </th>
                  <th className="table-th" scope="col">
                    Request Description
                  </th>
                  <th className="table-th action-th" scope="col">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {TableData?.length != 0 ? (
                  TableData.map((request, index) => (
                    <tr key={request._id} className="table-row">
                      <td className="table-td-id">{index + 1}</td>
                      <td
                        className="table-td"
                        data-testid={`myrequest-${index + 1}`}
                      >
                        <div className="request-requesterName">
                          <img
                            className="request-employeeProfile"
                            src={userIcon}
                            alt="profile"
                          />
                          <div>
                            <span>{request.requesterName}</span>
                            <span>{request.Userid}</span>
                          </div>
                        </div>
                      </td>
                      <td className="table-td">
                        {request.requesterDepartment}
                      </td>
                      <td className="table-td">
                        <div className="request-requestDescription">
                          <span>
                            <strong>Subject:</strong>{" "}
                            {request.requestType || request.requestTitle}
                          </span>
                          <div>
                            <span>
                              <strong>From:</strong>{" "}
                              {moment(request.requestFromDate).format(
                                "DD-MMM-YYYY"
                              )}{" "}
                            </span>
                            <span>
                              <strong>To:</strong>{" "}
                              {moment(request.requestEndDate).format(
                                "DD-MMM-YYYY"
                              )}
                            </span>
                          </div>
                          <span>
                            <strong>Description:</strong>
                          </span>
                          <span>{request.requestDescription}</span>
                        </div>
                      </td>
                      <td className="table-td">
                        {request.requestStatus === "Pending" ? (
                          <span className="pendingStatus">
                            {request?.requestStatus}
                          </span>
                        ) : (
                          <span
                            className={
                              request?.requestStatus === "Approved"
                                ? "approvedStatus"
                                : "rejectedStatus"
                            }
                          >
                            {request?.requestStatus}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="errorintable">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <div>
              <span className="footer-text">Showing 1 to 10 of </span>
              <span className="footer-text" data-testid="pagination-count">
                {CountOfItem}
              </span>
              <span className="footer-text"> results</span>
            </div>
            <Pagenation
              data={RawData}
              ItemPerPage={5}
              setTableData={setTableData}
              setCountOfItem={setCountOfItem}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
