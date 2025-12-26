const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/Model");

//--------------------------------------------------------------------------------Sign up to MySQL

const EmployeeSignup = async (req, res) => {
  try {
    const { empid, username, password, role, department } = req.body;

    // Validate required fields
    if (!empid || !username || !password || !role || !department) {
      return res
        .status(400)
        .json({ error: "Some data are missing in signup data" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in MongoDB
    await userModel.create({
      empid,
      username,
      password: hashedPassword, // store under 'password' field
      role,
      department,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ error: "Error registering user" });
  }
};

//--------------------------------------------------------------------------------Employee Log in

const EmployeeLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        id: user.empid,
        username: user.username,
        role: user.role,
        department: user.department,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json(token);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

//--------------------------------------------------------------------------------Employee Delete

const EmployeeDelete = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    // Delete by empid field in MongoDB
    const result = await userModel.deleteOne({ empid: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Database error" });
  }
};

module.exports = { EmployeeSignup, EmployeeLogin, EmployeeDelete };
