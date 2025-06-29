import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import icon from '../../assets/icon/user.png';
import MiniNavbar, { employeeLinks } from '../Mini-Nav';
import link from '../utilities/exportor';


const FrontEnd = () => {

    const Params = useParams();
    const Employee_ID = Params.id;
    return (
        <AddEmployee id={Employee_ID} />
    )
}


const AddEmployee = ({ id }) => {

    const [employeeName, setemployeeName] = useState("");
    const [employeeDOB, setemployeeDOB] = useState("");
    const [employeeGender, setemployeeGender] = useState("");
    const [employeeMarriage, setemployeeMarriage] = useState("");
    const [employeeEmailid, setemployeeEmailid] = useState("");
    const [employeePhonenum, setemployeePhonenum] = useState("");
    const [employeeDepartment, setemployeeDepartment] = useState("");
    const [employeeAccounttype, setemployeeAccounttype] = useState("");
    const Navigate = useNavigate();
    const [Page_Title, setPage_Title] = useState("Add Recruptment");
    const formReset = useRef();

    useEffect(() => {

        if (id) {
            link.api.GetOne("employees", id)
                .then(data => {
                    setemployeeName(data.employeeName);
                    const date = new Date(data.employeeDOB);
                    const formattedDate = date.toISOString().split('T')[0]; // This will give you "0001-01-01"
                    setemployeeDOB(formattedDate);
                    setemployeeGender(data.employeeGender);
                    setemployeeMarriage(data.employeeMarriage);
                    setemployeeEmailid(data.employeeEmailid);
                    setemployeePhonenum(data.employeePhonenum);
                    setemployeeDepartment(data.employeeDepartment);
                    setemployeeAccounttype(data.employeeAccounttype);
                });
            setPage_Title("Update");
        }

    }, [])


    // To upload an image
    const [selectedFile, setSelectedFile] = useState(icon);
    const [uploadFile, setuploadFile] = useState(icon);

    function handleImage(event) {
        const file = event.target.files[0];
        setuploadFile(file);
        const fileURL = URL.createObjectURL(file);
        setSelectedFile(fileURL);
    }

    const token = JSON.parse(sessionStorage.getItem('token'));
    async function UploadImage() {

        const formData = new FormData();
        formData.append('image', uploadFile);

        try {
            const response = await axios.post("http://localhost:3000/api/upload", formData, {
                headers: {
                    'Contect-Type': 'multipart/form-data',
                    authorization: `Bearer ${token}`
                }
            })
            // console.log(response.data.filename);
            return response.data.filename;
        } catch (err) {
            console.log("Front: ", err);
        }
    }

    const generateUsername = (name) => {
        const randomNum = Math.floor(Math.random() * 1000); // Random number (0-999)
        return `${name.toLowerCase().replace(/\s+/g, '')}${randomNum}`;
    }

    // Temp password
    const generateTempPassword = (length = 12) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    };


    const Calapi = async (event) => {
        event.preventDefault();

        let status = await link.api.CheckEmployeeEmail(employeeEmailid);
        if (status === "Employee found") {
            toast.error("Email id already used, Please check and update");
            return;
        }

        if (!id) {
            var empProfilePicName = await UploadImage();
            if (!empProfilePicName) {
                toast.error("Profile column is empty");
                return;
            }
        }

        const newRecruitdata = {
            employeeId: "EMP" + Math.floor(Math.random() * 1000),
            employeeName, employeeDOB, employeeGender, employeeMarriage, employeeEmailid,
            employeePhonenum, employeeDepartment, empProfilePicName, employeeAccounttype
        };

        const hasErrors = Object.keys(newRecruitdata).some((key) => newRecruitdata[key] === '');
        if (hasErrors) {
            toast.error('Please fill the form correctly');
            return;
        }

        // console.log(newRecruitdata);

        if (id) {

            const updateRecruitdata = {
                employeeName, employeeDOB, employeeGender, employeeMarriage, employeeEmailid,
                employeePhonenum, employeeDepartment, employeeAccounttype
            };

            link.api.Update("employees", id, updateRecruitdata).then((status) => {
                if (status === 200) {
                    toast.success(newRecruitdata.employeeName + "details updated succussfully!");
                    Navigate(link.url.listofEmployee);
                }
            })
        } else {
            link.api.Create("employees", newRecruitdata).then((status) => {
                if (status === 200) {
                    generateEmployeeCredential(newRecruitdata.employeeId);
                    toast.success("New Employee details succussfully uploaded!");
                    Navigate(link.url.listofEmployee);
                }
            })


        }
    }

    const generateEmployeeCredential = async (employeeId) => {
        await axios.post(`http://localhost:3000/user/employeesignup`,
            {
                empid: employeeId,
                username: generateUsername(employeeName), // send Credential to Employees
                password: generateTempPassword(12),
                role: employeeAccounttype
            }
            , {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
            }).catch((ERR) => console.log(ERR));
    }

    return (
        <div className="addProduct">

            <MiniNavbar links={employeeLinks} />

            <header className="css-header">
                <p className="css-title">{Page_Title}</p>
            </header>

            <form action="" ref={formReset}>

                <div className="empdetail-Container">

                    <div className="empdetail-Box">
                        <p>Personal Details</p>
                        <div className="empdetail-textdiv">
                            <label htmlFor="employeeName" name="Employee_Details">Profie Picture</label>
                            <input type="file" onChange={handleImage} />
                            <img className='employeePhoto' src={selectedFile} alt="" />
                        </div>
                        <div className="empdetail-textdiv">
                            <label htmlFor="employeeName" name="Employee_Details">Name</label>
                            <input type="text" name="" id="employeeName"
                                value={employeeName} onChange={(event) => setemployeeName(event.target.value)}
                            />
                        </div>
                        <div className="empdetail-textdiv">
                            <label htmlFor="employeeDOB" name="Employee_Details">DOB</label>
                            <input type="date" name="" id="employeeDOB"
                                value={employeeDOB} onChange={(event) => setemployeeDOB(event.target.value)}
                            />
                        </div>
                        <div className="empdetail-textdiv">
                            <label htmlFor="EmployeeGender" name="Employee_Details">Gender</label>
                            <select value={employeeGender} id="EmployeeGender" onChange={(event) => setemployeeGender(event.target.value)}>
                                <option value=""></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="empdetail-textdiv">
                            <label htmlFor="EmployeeMarriage" name="Employee_Details">Marriage details</label>
                            <select value={employeeMarriage} id="EmployeeMarriage" onChange={(event) => setemployeeMarriage(event.target.value)}>
                                <option value=""></option>
                                <option value="Marriage">Marriage</option>
                                <option value="Not Marriage">Not Marriage</option>
                                <option value="Divoide">Divoide</option>
                            </select>
                        </div>


                        <p>Contact</p>
                        <div className="empdetail-textdiv">
                            <label htmlFor="employeeEmailid" name="Employee_Details">Email ID</label>
                            <input type="text" name="" id="employeeEmailid"
                                value={employeeEmailid} onChange={(event) => setemployeeEmailid(event.target.value)}
                            />
                        </div>
                        <div className="empdetail-textdiv">
                            <label htmlFor="employeePhonenum" name="Employee_Details">Phone Number</label>
                            <input type="text" name="" id="employeePhonenum"
                                value={employeePhonenum} onChange={(event) => setemployeePhonenum(event.target.value)}
                            />
                        </div>

                        <p>Organization Details</p>
                        <div className="empdetail-textdiv">
                            <label htmlFor="EmployeeDepartment" name="Employee_Details">Department</label>
                            <select value={employeeDepartment} id="EmployeeDepartment" onChange={(event) => setemployeeDepartment(event.target.value)}>
                                <option value=""></option>
                                <option value="IT">IT</option>
                                <option value="Management">Management</option>
                                <option value="Customer service">Customer service</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Marketing department">Marketing department</option>
                                <option value="Operation">Operation</option>
                                <option value="Service">Service</option>
                                <option value="Production">Production</option>
                            </select>
                        </div>
                        <div className="empdetail-textdiv">
                            <label htmlFor="AccPermition" name="Employee_Details">Account Type</label>
                            <select value={employeeAccounttype} id="AccPermition" onChange={(event) => setemployeeAccounttype(event.target.value)}>
                                <option value=""></option>
                                <option value="MANAGER">Manager</option>
                                <option value="SUPERVISOR">Supervisor</option>
                                <option value="WORKER">Worker</option>
                            </select>
                        </div>

                        <div className="empdetail-buttondiv">
                            <button className="empdetail-submitbutton" onClick={Calapi}>Submit</button>
                            <button className="empdetail-submitbutton" onClick={() => { Navigate(link.url.listofEmployee) }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </form >

        </div >
    )
}

export default FrontEnd;