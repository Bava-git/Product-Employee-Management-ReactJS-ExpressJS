const connectMySQLdb = require('../config/mysqldb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//--------------------------------------------------------------------------------Sign up to MySQL

const EmployeeSignup = async (req, res) => {
  const { empid, username, password, role } = req.body;

  if (!empid || !username || !password || !role) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPassword = password;

  connectMySQLdb.query('INSERT INTO employeecredentials (empid, username, password, role) VALUES (?, ?, ?, ?)',
    [empid, username, hashedPassword, role], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error registering user' });
      }
      res.json({ message: 'User registered successfully' });
    });
};


//--------------------------------------------------------------------------------Employee Log in

const EmployeeLogin = (req, res) => {
  const { username, password } = req.body;

  connectMySQLdb.query('SELECT * FROM employeecredentials WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0];
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: 'Invalid username or password' });
    // }

    const token = jwt.sign({ id: user.empid, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json(token);
  });
};


module.exports = { EmployeeSignup, EmployeeLogin };


