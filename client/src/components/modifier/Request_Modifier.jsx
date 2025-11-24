import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../AuthContext';
import link from '../utilities/exportor';

const Request_Modifier = () => {

    const [requestData, setRequestData] = useState({
        requestType: '',
        requestTitle: '',
        requestDate: '',
        requestFromDate: '',
        requestEndDate: '',
        requestStatus: 'Pending',
        requestDescription: '',
        requesterDepartment: '',
        requesterName: '',
        requesterPosition: '',
        Userid: '',
    });
    const Navigate = useNavigate();
    const { user } = useAuth();
    const id = user?.id;

    useEffect(() => {
        findUser();
    }, []);

    const findUser = () => {
        link.api.GetOne("findone", id).then((data) => {
            setRequestData({
                requestType: '',
                requestTitle: '',
                requestDate: new Date(),
                requestFromDate: '',
                requestEndDate: '',
                requestStatus: 'Pending',
                requestDescription: '',
                requesterDepartment: data.department,
                requesterName: data.name,
                requesterPosition: data.position,
                Userid: id,
            });
        });
    };

    const sendData = (e) => {
        e.preventDefault();

        let newData = { ...requestData };

        if (newData.requestType === "") {
            const { requestType, ...rest } = newData;
            newData = rest;
            if (newData.requestFromDate === "" || newData.requestEndDate === "") {
                const { requestFromDate, requestEndDate, ...rest } = newData;
                newData = rest;
            }
        } else {
            const { requestTitle, ...rest } = newData;
            newData = rest;
        }

        const hasErrors = Object.keys(newData).some((key) => newData[key] === '');
        if (hasErrors) {
            toast.error('Please fill the form correctly');
            return;
        };

        link.api.Create("requests", newData).then(status => {
            if (status === 200) {
                toast.success("Requested succussfully");
                setRequestData({
                    requestType: '',
                    requestTitle: '',
                    requestDate: new Date(),
                    requestFromDate: '',
                    requestEndDate: '',
                    requestStatus: 'Pending',
                    requestDescription: '',
                    requesterDepartment: newData.requesterDepartment,
                    requesterName: newData.requesterName,
                    requesterPosition: newData.requesterPosition,
                    Userid: newData.Userid,
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

    const textareaRef = useRef(null);

    const handleInput = () => {
        const el = textareaRef.current;
        el.style.height = "auto";        // reset height
        el.style.height = el.scrollHeight + "px"; // set to content height
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <div className="product-card">
                    <h1 className="pm-title">New Request</h1>
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
                        {requestData.requestType === "" &&
                            <div className="col-span-2">
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
                        }
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
                        <div className="col-span-2">
                            <label className="form-label">
                                <p className="label-text">Description(<span>*</span>)</p>
                                <textarea
                                    className="form-textarea"
                                    name="requestDescription"
                                    ref={textareaRef}
                                    onInput={handleInput}
                                    onChange={handleChange}
                                    value={requestData.requestDescription}
                                />
                            </label>
                        </div>
                        <div className="col-span-2 pm_button_div">
                            <button className="redButton" type="button" onClick={() => Navigate(link.url.myRequest)}>Cancel</button>
                            <button className="commonButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </main >
        </div >
    )
}
export default Request_Modifier;