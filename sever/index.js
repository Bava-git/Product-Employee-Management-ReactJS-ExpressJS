const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./config/mongodb.js');
const authenticate = require('./config/middleware/authenticate.js');
connectMongoDB();
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

const productRoutes = require('./routes/product-Routes.js');
const employeeRoutes = require('./routes/employee-Routes.js');
const requestRoutes = require('./routes/request-Routes.js');
const userRoutes = require('./routes/user-Routes.js');

// app.use('/api', authenticate['SUPERVISOR']);

app.use("/api/products", productRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/requests", requestRoutes);
app.use("/user", userRoutes);

const { employeeModel } = require('./model/Model');

const multerConfig = require('./config/multer.js');
const path = require('path');

app.post('/api/upload', authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR']), multerConfig.single('image'), (req, resp) => {
    try {
        resp.json({
            filename: req.file.filename,
            out: "Success"
        });
    } catch (err) {
        resp.json({ error: err.message });
    }
});

app.use("/api/uploads", authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR']), express.static(path.join(__dirname, 'uploads')));


app.get("/api/findone/:id", authenticate(['ADMIN', 'MANAGER', 'SUPERVISOR', 'WORKER']), async (req, resp) => {
    try {
        let result = await employeeModel.findOne({ employeeId: req.params.id });
        if (result) {
            return resp.send({ department: result.employeeDepartment, name: result.employeeName, position: result.employeeAccounttype });
        } else {
            resp.send({ result: "No Employee found" });
        }
    } catch (err) {
        console.log(err);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});