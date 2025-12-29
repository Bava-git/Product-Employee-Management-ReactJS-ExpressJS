const { requestModel } = require("../model/Model");

//--------------------------------------------------------------------------------add Request

const addRequest = (req, resp) => {
  requestModel
    .create(req.body)
    .then((request) => {
      resp.json(request);
    })
    .catch((err) => {
      console.log(err);
    });
};

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
    resp
      .status(500)
      .send({ error: "An error occurred while fetching requests" });
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
    resp
      .status(500)
      .send({ error: "An error occurred while fetching requests" });
  }
};

//--------------------------------------------------------------------------------get requests from userid

const filterRequest = async (req, resp) => {
  try {
    const result = await requestModel.find({ Userid: req.params.id });

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

//--------------------------------------------------------------------------------get requests from userid and status

const filteredByIdAndStatus = async (req, resp) => {
  try {
    const id = req.params.id;
    const status = req.params.status;

    let query = {};
    if (status === "Pending") {
      query = {
        $and: [{ Userid: id }, { requestStatus: "Pending" }],
      };
    } else if (status === "Not Pending") {
      query = {
        $and: [
          { Userid: id },
          { requestStatus: { $in: ["Approved", "Rejected"] } },
        ],
      };
    }

    const result = await requestModel.find(query);

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

//--------------------------------------------------------------------------------get requests from position

const filteredByPosition = async (req, resp) => {
  try {
    const role = req.params.position;

    let query = {};
    if (role === "MANAGER") {
      // Can see both Supervisors and Workers
      query = { requesterPosition: { $in: ["SUPERVISOR", "WORKER"] } };
    } else if (role === "SUPERVISOR") {
      // Can only see Workers
      query = { requesterPosition: "WORKER" };
    } else if (role === "ADMIN") {
      // Can see all
      query = {
        requesterPosition: { $in: ["MANAGER", "SUPERVISOR", "WORKER"] },
      };
    }

    const filteredData = await requestModel.find(query);

    if (filteredData.length > 0) {
      return resp.send(filteredData);
    } else {
      return resp.status(204).json({ message: "No Request found" });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).json({ error: "Server error" });
  }
};

//--------------------------------------------------------------------------------Export
module.exports = {
  addRequest,
  listofRequest,
  updateRequest,
  filterRequest,
  filteredByPosition,
  filteredByIdAndStatus,
};
