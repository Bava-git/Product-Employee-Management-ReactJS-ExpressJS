const express = require("express");
const router = express.Router();
const authenticate = require("../config/middleware/authenticate.js");
const {
  EmployeeSignup,
  EmployeeLogin,
  EmployeeDelete,
} = require("../controllers/user-Controller"); // Import controller functions

// Define routes
router.post(
  "/employeesignup",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR"]),
  EmployeeSignup
);
router.post("/employeelogin", EmployeeLogin);
router.delete(
  "/employeedelete/:id",
  authenticate(["ADMIN", "MANAGER"]),
  EmployeeDelete
);

module.exports = router;
