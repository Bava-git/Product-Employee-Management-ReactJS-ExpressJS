const express = require("express");
const router = express.Router();
const authenticate = require("../config/middleware/authenticate.js");
const {
  addRequest,
  listofRequest,
  updateRequest,
  filterRequest,
  filteredByPosition,
  filteredByIdAndStatus,
} = require("../controllers/request-Controller"); // Import controller functions

// Define routes
router.get(
  "/",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]),
  listofRequest
);
router.post(
  "/add",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]),
  addRequest
);
router.put(
  "/update/:id",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]),
  updateRequest
);
router.get(
  "/:id",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]),
  filterRequest
);
router.get(
  "/:id/:status",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR", "WORKER"]),
  filteredByIdAndStatus
);
router.get(
  "/by/:position",
  authenticate(["ADMIN", "MANAGER", "SUPERVISOR"]),
  filteredByPosition
);

module.exports = router;
