const { employeeModel } = require("../model/Model");
const authenticate = require("../config/middleware/authenticate");
//--------------------------------------------------------------------------------List Employees
const listEmployees = async (req, resp) => {
  try {
    const employees = await employeeModel.find();
    // console.log(employees);
    resp.status(200).send(employees);
  } catch (error) {
    console.error("Error fetching Employees:", error);
    resp
      .status(500)
      .send({ error: "An error occurred while fetching Employees" });
  }
};

//--------------------------------------------------------------------------------Get Employee By Email id
const CheckEmployeeEmail = async (req, resp) => {
  let employee = await employeeModel.findOne({
    employeeEmailid: req.params.email,
  });
  if (employee) {
    return resp.status(200).send({ result: "Employee found" });
  } else {
    resp.status(200).send({ result: "No Employee found" });
  }
};

//--------------------------------------------------------------------------------Create Employees
const createEmployee = (req, resp) => {
  employeeModel
    .create(req.body)
    .then((add) => {
      resp.status(200).json(add);
    })
    .catch((err) => resp.status(500).json(err));
};

//--------------------------------------------------------------------------------List Employee Details For Review
const GetupdateEmployee = async (req, resp) => {
  let result = await employeeModel.findOne({ _id: req.params.id });
  if (result) {
    return resp.send(result);
  } else {
    resp.send({ result: "No Employee found" });
  }
};

//--------------------------------------------------------------------------------Update Employee
const updateEmployee = async (req, resp) => {
  let result = await employeeModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
};

//--------------------------------------------------------------------------------Delete Employee
const deleteEmployee = async (req, resp) => {
  try {
    let result = await employeeModel.deleteOne({ _id: req.params.id });
    resp.status(200).send(result);
  } catch (error) {
    console.error("Employee Deleted api", error);
    resp
      .status(500)
      .send({ error: "An error occurred while fetching Employees" });
  }
};

//--------------------------------------------------------------------------------Filter based on position

const filteredEmployeeByPosition = async (req, resp) => {
  try {
    const role = req.params.position;

    let query = {};
    if (role === "MANAGER") {
      // Can see both Supervisors and Workers
      query = { employeePosition: { $in: ["SUPERVISOR", "WORKER"] } };
    } else if (role === "SUPERVISOR") {
      // Can only see Workers
      query = { employeePosition: "WORKER" };
    } else if (role === "ADMIN") {
      // Can see all
      query = {
        employeePosition: { $in: ["MANAGER", "SUPERVISOR", "WORKER"] },
      };
    }

    const filteredData = await employeeModel.find(query);

    if (filteredData.length > 0) {
      return resp.send(filteredData);
    } else {
      return resp.status(204).json({ message: "No employee found" });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  listEmployees,
  createEmployee,
  GetupdateEmployee,
  updateEmployee,
  deleteEmployee,
  CheckEmployeeEmail,
  filteredEmployeeByPosition,
};
