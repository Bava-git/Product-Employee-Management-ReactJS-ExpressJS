import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import icon from '../../assets/icon/user.png';
import MiniNavbar, { employeeLinks } from '../Mini-Nav';
import link from '../utilities/exportor';
import { toast } from 'sonner';

function Employee_Dashboard() {

  const [oldRequest, setoldRequest] = useState([]);
  const [newRequest, setnewRequest] = useState([]);
  const auth = JSON.parse(sessionStorage.getItem("token")) || "";
  if (auth) {
    const deauth = jwtDecode(auth);
    var userType = deauth.role;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    link.api.List("requests")
      .then(data => {
        data = data.filter(item => item.requesterPosition != userType);
        setoldRequest(data.filter(item => item.requestStatus != "Pending"));
        setnewRequest(data.filter(item => item.requestStatus === "Pending"));
      });
  }


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

    <div className="Product_Dashboard">

      <MiniNavbar links={employeeLinks} />

      <header className="css-header">
        <div>
          <p className="css-title"> New Request</p>
        </div>
      </header>

      <div className='request-tableContainer'>

        <table border={"1"}>
          <thead>
            <tr>
              <th style={{ width: "10px" }}>S.No</th>
              <th style={{ width: "200px" }}>Employee ID</th>
              <th style={{ width: "60px" }}>Profile</th>
              <th style={{ width: "100px" }}>Name</th>
              <th>Department</th>
              <th>Request</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          {newRequest.length > 0 ? newRequest.map((item, index) =>

            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{item.Userid}</td>
                <td>
                  <img className='request-employeeProfile' src={icon} alt="profile" />
                </td>
                <td>{item.requesterName}</td>
                <td>{item.requesterDepartment}</td>
                <td>{item.requestType || item.requestTitle}</td>
                <td>{item.requestDescription}</td>
                <td>
                  <button className='approveButton' onClick={() => { changeStatus(item._id, "Approved") }}>Approve</button>
                  <button className='rejectButton' onClick={() => { changeStatus(item._id, "Rejected") }}>Reject</button>
                </td>
              </tr>
            </tbody>
          )
            : <tbody><tr><td colSpan="9" className='errorintable'>No records found</td></tr></tbody>}
          <tfoot></tfoot>
        </table>

      </div>

      <header className="css-header">
        <div>
          <p className="css-title">Old Request</p>
        </div>
      </header>

      <div className='request-tableContainer'>

        <table border={"1"}>
          <thead>
            <tr>
              <th style={{ width: "10px" }}>S.No</th>
              <th style={{ width: "200px" }}>Employee ID</th>
              <th style={{ width: "60px" }}>Profile</th>
              <th style={{ width: "100px" }}>Name</th>
              <th>Department</th>
              <th>Request</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>

          {oldRequest.length > 0 ? oldRequest.map((item, index) =>

            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{item.Userid}</td>
                <td>
                  <img className='request-employeeProfile' src={icon} alt="profile" />
                </td>
                <td>{item.requesterName}</td>
                <td>{item.requesterDepartment}</td>
                <td>{item.requestType || item.requestTitle}</td>
                <td>{item.requestDescription}</td>
                <td>{item.requestStatus}</td>
              </tr>
            </tbody>
          )

            : <tbody><tr><td colSpan="9" className='errorintable'>No records found</td></tr></tbody>}


          <tfoot>

          </tfoot>

        </table>

      </div>

    </div>
  )
}

export default Employee_Dashboard;
