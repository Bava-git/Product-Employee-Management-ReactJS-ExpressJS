const { requestModel } = require('../model/Model');

//--------------------------------------------------------------------------------add Request

const addRequest = (req, resp) => {
    requestModel.create(req.body)
        .then(request => {
            resp.json(request);
        })
        .catch(err => {
            console.log(err);
        })
}

//--------------------------------------------------------------------------------list of Request

const listofRequest = async (req, resp) => {
    try {
        const requests = await requestModel.find();
        if (requests.length > 0) {
            resp.status(200).send(requests);
        } else {
            resp.status(404).send({ result: "No record found" });
        }
    } catch (error) {
        console.error("Error fetching requests:", error);
        resp.status(500).send({ error: "An error occurred while fetching requests" });
    }
};

//--------------------------------------------------------------------------------update Request

const updateRequest = async (req, resp) => {

    try {
        let result = await requestModel.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        resp.send(result);
    } catch (error) {
        console.error("Error fetching requests:", error);
        resp.status(500).send({ error: "An error occurred while fetching requests" });
    }

};

//--------------------------------------------------------------------------------get requests from userid

const filterRequest = async (req, resp) => {
    try {
        const result = await requestModel.find(
            { Userid: req.params.id },
            {
                requestTitle: 1,
                requestType: 1,
                requestDescription: 1,
                requestDate: 1,
                requestFromDate: 1,
                requestEndDate: 1,
                requestStatus: 1
            }
        );

        if (result.length > 0) {
            return resp.send(result);
        } else {
            return resp.status(404).json({ message: "No Request found" });
        }
    } catch (err) {
        console.error(err);
        resp.status(500).json({ error: "Server error" });
    }
};



//--------------------------------------------------------------------------------Export
module.exports = { addRequest, listofRequest, updateRequest, filterRequest };



