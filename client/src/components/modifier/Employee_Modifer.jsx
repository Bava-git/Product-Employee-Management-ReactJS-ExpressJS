import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import icon from "../../assets/icon/user.png";
import link from "../utilities/exportor";

const FrontEnd = () => {
  const Params = useParams();
  const Employee_ID = Params.id;
  return <AddEmployee id={Employee_ID} />;
};

const AddEmployee = ({ id }) => {
  const Navigate = useNavigate();
  const [Page_Title, setPage_Title] = useState("Add Recruitment");

  const [employeeData, setEmployeeData] = useState({
    employeeId: "EMP" + Math.floor(Math.random() * 1000),
    employeeName: "",
    employeeDOB: "",
    employeeGender: "",
    employeeMarriage: "",
    employeeEmailid: "",
    employeePhonenum: "",
    employeeDepartment: "",
    employeePosition: "",
  });

  useEffect(() => {
    fetchEditMode();
  }, []);

  const fetchEditMode = async () => {
    if (id) {
      let empProfilePicName = "";
      await link.api.GetOne("employees", id).then((data) => {
        const date = new Date(data.employeeDOB);
        const formattedDate = date.toISOString().split("T")[0]; // This will give you "0001-01-01"
        empProfilePicName = data.empProfilePicName;
        setEmployeeData({
          employeeId: data.employeeId,
          employeeName: data.employeeName,
          employeeDOB: formattedDate,
          employeeGender: data.employeeGender,
          employeeMarriage: data.employeeMarriage,
          employeeEmailid: data.employeeEmailid,
          employeePhonenum: data.employeePhonenum,
          employeeDepartment: data.employeeDepartment,
          employeePosition: data.employeePosition,
        });
      });
      link.api
        .GetImage(empProfilePicName)
        .then((data) => setSelectedFile(data));
      setPage_Title("Update");
    }
  };

  // To upload an image
  const [selectedFile, setSelectedFile] = useState(icon);
  const [uploadFile, setuploadFile] = useState(icon);

  function handleImage(event) {
    const file = event.target.files[0];
    setuploadFile(file);
    const fileURL = URL.createObjectURL(file);
    setSelectedFile(fileURL);
  }

  const generateUsername = (name) => {
    const randomNum = Math.floor(Math.random() * 1000); // Random number (0-999)
    return `${name.toLowerCase().replace(/\s+/g, "")}${randomNum}`;
  };

  // Temp password
  const generateTempPassword = (length = 12) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  };

  const sendData = async (event) => {
    event.preventDefault();

    const hasErrors = Object.keys(employeeData).some(
      (key) => employeeData[key] === ""
    );
    if (hasErrors) {
      toast.error("Please fill the form correctly");
      console.log(employeeData);
      return;
    }

    if (!id) {
      let status = await link.api.CheckEmployeeEmail(
        employeeData.employeeEmailid
      );
      if (status === "Employee found") {
        toast.error("Email id already used, Please check and update");
        return;
      }
      var empProfilePicName = await link.api.UploadImage(
        "employee",
        uploadFile,
        employeeData?.employeeId
      );
      if (!empProfilePicName) {
        toast.error("Product image is missing!");
        return;
      }
    }

    // console.log(employeeData);

    if (id) {
      link.api.Update("employees", id, employeeData).then((status) => {
        if (status === 200) {
          toast.success(
            employeeData.employeeName + " details updated succussfully!"
          );
          Navigate(link.url.listofEmployee);
        }
      });
    } else {
      link.api
        .Create("employees", { ...employeeData, empProfilePicName })
        .then((status) => {
          if (status === 200) {
            generateEmployeeCredential(employeeData.employeeId);
            toast.success("New Employee details succussfully uploaded!");
            Navigate(link.url.listofEmployee);
          }
        });
    }
  };

  const token = JSON.parse(sessionStorage.getItem("token"));
  const generateEmployeeCredential = async (employeeId) => {
    await axios
      .post(
        `http://localhost:3000/user/employeesignup`,
        {
          empid: employeeId,
          username: generateUsername(employeeData.employeeName), // send Credential to Employees
          password: generateTempPassword(12),
          role: employeeData.employeePosition,
          department: employeeData.employeeDepartment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((ERR) => console.log(ERR));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="product-card">
          <h1 className="pm-title">{Page_Title}</h1>
          <form className="form-grid" onSubmit={sendData}>
            <div className="col-span-2">
              <label className="form-label">
                <p className="label-text">
                  Name(<span>*</span>)
                </p>
                <input
                  className="form-input"
                  name="employeeName"
                  value={employeeData.employeeName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  DOB(<span>*</span>)
                </p>
                <input
                  className="form-input"
                  name="employeeDOB"
                  value={employeeData.employeeDOB}
                  onChange={handleChange}
                  type="date"
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Gender(<span>*</span>)
                </p>
                <select
                  name="employeeGender"
                  className="form-select"
                  value={employeeData.employeeGender}
                  onChange={handleChange}
                >
                  <option value="">-- Select Gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Married Status(<span>*</span>)
                </p>
                <select
                  name="employeeMarriage"
                  className="form-select"
                  value={employeeData.employeeMarriage}
                  onChange={handleChange}
                >
                  <option value="">-- Select Status --</option>
                  <option value="Marriage">Marriage</option>
                  <option value="Not Marriage">Not Marriage</option>
                  <option value="Divoide">Divoide</option>
                </select>
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Email id(<span>*</span>)
                </p>
                <input
                  className="form-input"
                  name="employeeEmailid"
                  value={employeeData.employeeEmailid}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Phone Number(<span>*</span>)
                </p>
                <input
                  className="form-input"
                  name="employeePhonenum"
                  value={employeeData.employeePhonenum}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                <p className="label-text">
                  Department(<span>*</span>)
                </p>
                <select
                  name="employeeDepartment"
                  className="form-select"
                  value={employeeData.employeeDepartment}
                  onChange={handleChange}
                >
                  <option value="">-- Select Department --</option>
                  <option value="IT">IT</option>
                  <option value="Management">Management</option>
                  <option value="Customer service">Customer service</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Marketing department">
                    Marketing department
                  </option>
                  <option value="Operation">Operation</option>
                  <option value="Service">Service</option>
                  <option value="Production">Production</option>
                </select>
              </label>
            </div>
            <div className="col-span-2">
              <label className="form-label">
                <p className="label-text">
                  Position(<span>*</span>)
                </p>
                <select
                  name="employeePosition"
                  className="form-select"
                  value={employeeData.employeePosition}
                  onChange={handleChange}
                >
                  <option value="">-- Select Position --</option>
                  <option value="MANAGER">Manager</option>
                  <option value="SUPERVISOR">Supervisor</option>
                  <option value="WORKER">Worker</option>
                </select>
              </label>
            </div>
            <div className="col-span-2">
              <label htmlFor="employeeName" name="Employee_Details">
                <p className="label-text">
                  Profie Picture(<span>*</span>)
                </p>
                <img className="employeePhoto" src={selectedFile} alt="" />
                <input type="file" accept=".jpg,.jpeg" onChange={handleImage} />
              </label>
            </div>
            <div className="col-span-2 pm_button_div">
              <button
                className="redButton"
                type="button"
                data-testid="bn-cancel"
                onClick={() => Navigate(link.url.listofEmployee)}
              >
                Cancel
              </button>
              <button
                className="commonButton"
                type="submit"
                data-testid="bn-submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FrontEnd;
