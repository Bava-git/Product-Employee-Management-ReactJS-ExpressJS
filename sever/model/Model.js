const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    employeeId: String,
    employeeName: String,
    employeeDOB: Date,
    employeeGender: String,
    employeeMarriage: String,
    employeeEmailid: String,
    employeePhonenum: Number,
    employeePosition: String,
    employeeDepartment: String,
    employeeAccounttype: String,
    empProfilePicName: String,

});

const employeeModel = mongoose.model("Employees", employeeSchema);

const productSchema = new mongoose.Schema({

    productName: String,
    productPrice: Number,
    productColour: String,
    productHeight: Number,
    productLenth: Number,
    productWidth: Number,
    brandName: String,
    brandOrigin: String,
    brandAddress: String,
    brandSellerName: String,
    Userid: String,

});

const productModel = mongoose.model("Products", productSchema);


const requestSchema = new mongoose.Schema({
    requestType: String,
    requestTitle: String,
    requestDescription: String,
    requestStatus: String,
    requesterName: String,
    requesterDepartment: String,
    requestFromDate: { type: Date },
    requestEndDate: { type: Date },
    requesterPosition: String,
    Userid: String,
});

const requestModel = mongoose.model("requestdbs", requestSchema);


module.exports = { productModel, employeeModel, requestModel };

