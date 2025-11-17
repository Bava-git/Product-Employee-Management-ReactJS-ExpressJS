import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../AuthContext';
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

    const [requestData, setRequestData] = useState({
        requestType: '',
        requestTitle: '',
        requestFromDate: '',
        requestEndDate: '',
        requestStatus: 'Pending',
        requestDescription: '',
        requesterDepartment: '',
        requesterName: '',
        requesterPosition: '',
    });

    const [Error, setError] = useState(true);
    const { id } = useAuth();

    useEffect(() => {
        findUser();
    }, []);


    const findUser = () => {
        link.api.GetOne("findone", id).then((data) => {
            setRequestData({
                requestType: '',
                requestTitle: '',
                requestFromDate: '',
                requestEndDate: '',
                requestStatus: 'Pending',
                requestDescription: '',
                requesterDepartment: data.department,
                requesterName: data.name,
                requesterPosition: data.position,
            });
        });
    }

    const sendData = (e) => {
        e.preventDefault();

        console.log(requestData);

        const hasErrors = Object.keys(requestData).some((key) => requestData[key] === '');
        if (hasErrors) {
            toast.error('Please fill the form correctly');
            return;
        }

        link.api.Create("requests", requestData).then(status => {
            if (status === 200) {
                toast.success("Requested succussfully");
                setRequestData({
                    requestType: '',
                    requestTitle: '',
                    requestFromDate: '',
                    requestEndDate: '',
                    requestStatus: 'Pending',
                    requestDescription: '',
                    requesterDepartment: '',
                    requesterName: '',
                    requesterPosition: '',
                });
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <h1 className="pm-title">New Request</h1>
                <div className="product-card">
                    <form className="form-grid" onSubmit={sendData}>
                        <div className="col-span-2">
                            <label className="form-label">
                                <p className="label-text">Subject(<span>*</span>)</p>
                                <select name="requestType" className="form-select"
                                    value={requestData.requestType} onChange={handleChange}>
                                    <option value="">-- Select Subject --</option>
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Vacation">Vacation</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Title(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="requestTitle"
                                    onChange={handleChange}
                                    value={requestData.requestTitle}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">From(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="requestFromDate"
                                    onChange={handleChange}
                                    value={requestData.requestFromDate}
                                    type='date'
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">To(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="requestEndDate"
                                    onChange={handleChange}
                                    value={requestData.requestEndDate}
                                    type='date'
                                />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">
                                <p className="label-text">Description(<span>*</span>)</p>
                                <input
                                    className="form-input"
                                    name="requestDescription"
                                    onChange={handleChange}
                                    value={requestData.requestDescription}
                                />
                            </label>
                        </div>
                        <div className="col-span-2 pm_button_div">
                            <button className="redButton" type="button" onClick={() => Navigate(link.url.listofEmployee)}>Cancel</button>
                            <button className="commonButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </main >
        </div >



        // <div className="Request-div-container">

        //     <MiniNavbar links={requestLinks} />

        //     <div className="Request-div">

        //         <div className='Request-title-div'>
        //             <p className="Request-title">New Request</p>
        //         </div>

        //         <div className="Request-templete-div">
        //             <p>Templete</p>
        //             <select defaultValue={""} className='Request-templete-select'
        //                 onChange={event => { setrequestType(event.target.value) }}
        //             >
        //                 <option value=""></option>
        //                 <option value="Sick Leave">Sick Leave</option>
        //                 <option value="Vacation">Vacation</option>
        //             </select>
        //         </div>

        //         {!requestType &&
        //             <div className="Request-requestTitle-div">
        //                 <p>Request</p>
        //                 <input type="text" placeholder='Subject'
        //                     onChange={event => setrequestTitle(event.target.value)}
        //                 />
        //             </div>
        //         }

        //         <div className="Request-date-div">
        //             <p>From:</p>
        //             <input type="date"
        //                 value={requestFromDate} onChange={event => {
        //                     if (event.target.value != "") {
        //                         setError(false);
        //                         setrequestFromDate(event.target.value);
        //                     }
        //                 }}
        //             />
        //             <p>To:</p>
        //             <input type="date"
        //                 value={requestEndDate} onChange={event => {
        //                     if (event.target.value != "") {
        //                         setError(false);
        //                         setrequestEndDate(event.target.value);
        //                     }
        //                 }}
        //             />
        //         </div>

        //         <div className="Request-date-div">
        //             <p>Description:</p>
        //             <textarea placeholder='Description'
        //                 onChange={event => {
        //                     if (event.target.value != "") {
        //                         setrequestDescription(event.target.value);
        //                         setError(false);
        //                     }
        //                 }}
        //             ></textarea>
        //         </div>

        //         <div className='Request-button-div'>
        //             <button className='commonButton'
        //                 onClick={sumbitData}
        //             >Submit</button>
        //         </div>
        //     </div>
        // </div>
    )
}
export default Requests;