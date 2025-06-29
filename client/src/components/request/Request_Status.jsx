import moment from 'moment';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import MiniNavbar, { requestLinks } from '../Mini-Nav';
import link from '../utilities/exportor';

function Request_Status() {

  const [filter, setfilter] = useState("");

  useEffect(() => {
    fetchProductData();
  }, []);
  const auth = JSON.parse(sessionStorage.getItem("token")) || "";
  const deauth = jwtDecode(auth);
  const User_id = deauth.id;

  const fetchProductData = () => {
    link.api.GetOne("requests", User_id).then((data) => {
      setfilter(data);
    });
  };

  const TableContent = [];
  let length = filter?.length ?? 0;
  for (let i = 0; i < length; i++) {
    const item = filter[i];
    TableContent.push(
      <tr key={i} style={{ color: item.requestStatus === "Approved" ? "green" : "red", fontWeight: "bold", }}>
        <td>{i + 1}</td>
        <td style={{ width: "200px", }}>{item._id}</td>
        <td>{item.requestType || item.requestTitle}</td>
        <td>{item.requestDescription}</td>
        <td>{moment(item.requestFromDate).format("DD-MMM-YYYY")}</td>
        <td>{moment(item.requestEndDate).format("DD-MMM-YYYY")}</td>
        <td>{item.requestStatus}</td>
      </tr>
    )
  }

  return (

    <div className="Product_Dashboard">

      <MiniNavbar links={requestLinks} />

      <header className="css-header">
        <div>
          <p className="css-title">Request Status</p>
        </div>
      </header>
      <div className='request-tableContainer'>

        <table border={"1"}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Request ID</th>
              <th>Request</th>
              <th>Description</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {TableContent.length > 0 ? TableContent : <tr><td colSpan="8" className='errorintable'>No records found</td></tr>}
          </tbody>
          <tfoot>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default Request_Status;
