const express = require("express");
const router = express.Router();

const {
  addIssue,
  listIssues,
  updateIssue,
  deleteIssue,
} = require("../controllers/issues");

router.post("/add-issue", addIssue);

router.get("/list-issues", listIssues);

router.patch("/update-issue/:id", updateIssue);

router.delete("/delete-issue/:id", deleteIssue);

module.exports = router;
