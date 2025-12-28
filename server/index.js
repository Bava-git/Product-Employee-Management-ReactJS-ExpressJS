const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./config/mongodb.js");
const authenticate = require("./config/middleware/authenticate.js");
connectMongoDB();
require("dotenv").config();
const helmet = require("helmet");

const app = express();
app.use(express.json());

// problem - X-Content-Type-Options Header Missing Or app.use(helmet());
// Risk if missing: Attackers can upload or inject files that the browser misinterprets, potentially executing malicious code.
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// problem - Disable the X-Powered-By header or app.use(helmet());
// Risk: It’s an information disclosure issue — not a direct exploit, but it makes attacks easier.
app.disable("x-powered-by");

// allow only trusted domains Cross-Domain Misconfiguration (CORS)
app.use(
  cors({
    origin: ["http://localhost:3001"], // whitelist
    methods: ["OPTION", "GET", "POST", "PUT", "DELETE"],
    // credentials: true, // not using cookies
  })
);

// Use Helmet to set Content Security Policy(CSP) automatically (XSS protection)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:"],
      frameAncestors: ["'none'"],
      formAction: ["'self'"],
      sandbox: [],
    },
  })
);

const productRoutes = require("./routes/product-Routes.js");
const employeeRoutes = require("./routes/employee-Routes.js");
const requestRoutes = require("./routes/request-Routes.js");
const userRoutes = require("./routes/user-Routes.js");

// or app.use('/api', authenticate['SUPERVISOR']);
app.use("/api/products", productRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/requests", requestRoutes);
app.use("/user", userRoutes);

const { employeeModel } = require("./model/Model");

const multerConfig = require("./config/multer.js");
const path = require("path");

app.post(
  "/api/employee/upload",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR"]),
  multerConfig.single("image"),
  (req, resp) => {
    try {
      resp.json({
        filename: req.file.filename,
        out: "Success",
      });
    } catch (err) {
      resp.json({ error: err.message });
    }
  }
);

app.post(
  "/api/product/upload",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]),
  multerConfig.single("image"),
  (req, resp) => {
    try {
      resp.json({
        filename: req.file.filename,
        out: "Success",
      });
    } catch (err) {
      resp.json({ error: err.message });
    }
  }
);

app.use(
  "/api/uploads",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]),
  express.static(path.join(__dirname, "uploads"))
);

app.get(
  "/api/findone/:id",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]),
  async (req, resp) => {
    try {
      let result = await employeeModel.findOne({ employeeId: req.params.id });
      if (result) {
        return resp.send({
          department: result.employeeDepartment,
          name: result.employeeName,
          position: result.employeeAccounttype,
        });
      } else {
        resp.send({ result: "No Employee found" });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
