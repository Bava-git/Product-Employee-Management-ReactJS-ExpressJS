import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';
import MiniNavbar, { requestLinks } from '../Mini-Nav';
import link from '../utilities/exportor';

const Requests = () => {
    const [requestType, setrequestType] = useState("");
    const [requestTitle, setrequestTitle] = useState("");
    const [requestFromDate, setrequestFromDate] = useState("");
    const [requestEndDate, setrequestEndDate] = useState("");
    const [requestStatus, setrequestStatus] = useState("Pending");
    const [requestDescription, setrequestDescription] = useState("");
    const [requesterDepartment, setrequesterDepartment] = useState("");
    const [requesterName, setrequesterName] = useState("");
    const [requesterPosition, setrequesterPosition] = useState("");

    const [Error, setError] = useState(true);
    const auth = JSON.parse(sessionStorage.getItem("token"));
    const deauth = jwtDecode(auth);
    const Userid = deauth.id;

    useEffect(() => {
        findUser();
    }, []);


    const findUser = () => {
        link.api.GetOne("findone", Userid).then((data) => {
            setrequesterDepartment(data.department);
            setrequesterName(data.name);
            setrequesterPosition(data.position);
        });
    }

    const sumbitData = () => {

        if (Error) {
            toast.error("Invaid details, please check and fill");
            return;
        }

        let newRequest = {
            requestType, requestTitle, requestFromDate, requestEndDate, requestStatus, requestDescription,
            Userid, requesterName, requesterDepartment, requesterPosition,
        }

        link.api.Create("requests", newRequest).then(status => {
            if (status === 200) {
                toast.success("Requested succussfully");
                setrequestType("");
                setrequestTitle("");
                setrequestFromDate("");
                setrequestEndDate("");
                setrequestDescription("");
                setrequesterDepartment("");
                setrequesterName("");
                setrequesterPosition("");
            }
        });
    }

    return (
        <div className="Request-div-container">

            <MiniNavbar links={requestLinks} />

            <div className="Request-div">

                <div className='Request-title-div'>
                    <p className="Request-title">New Request</p>
                </div>

                <div className="Request-templete-div">
                    <p>Templete</p>
                    <select defaultValue={""} className='Request-templete-select'
                        onChange={event => { setrequestType(event.target.value) }}
                    >
                        <option value=""></option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Vacation">Vacation</option>
                    </select>
                </div>

                {!requestType &&
                    <div className="Request-requestTitle-div">
                        <p>Request</p>
                        <input type="text" placeholder='Subject'
                            onChange={event => setrequestTitle(event.target.value)}
                        />
                    </div>
                }

                <div className="Request-date-div">
                    <p>From:</p>
                    <input type="date"
                        value={requestFromDate} onChange={event => {
                            if (event.target.value != "") {
                                setError(false);
                                setrequestFromDate(event.target.value);
                            }
                        }}
                    />
                    <p>To:</p>
                    <input type="date"
                        value={requestEndDate} onChange={event => {
                            if (event.target.value != "") {
                                setError(false);
                                setrequestEndDate(event.target.value);
                            }
                        }}
                    />
                </div>

                <div className="Request-date-div">
                    <p>Description:</p>
                    <textarea placeholder='Description'
                        onChange={event => {
                            if (event.target.value != "") {
                                setrequestDescription(event.target.value);
                                setError(false);
                            }
                        }}
                    ></textarea>
                </div>

                <div className='Request-button-div'>
                    <button className='Request-button'
                        onClick={sumbitData}
                    >Submit</button>
                </div>
            </div>
        </div>
    )
}
export default Requests;