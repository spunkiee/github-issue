const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const Issue = require("../models/issues");

exports.addIssue = (req, res) => {
  const { issueTitle, issueDiscription, addedBy, email } = req.body;
  const _id = uuidv4();

  const newIssue = new Issue({
    issueTitle,
    issueDiscription,
    addedBy,
    _id,
    email,
  });

  newIssue.save((err, __) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong.",
      });
    }

    res.json({
      message: `Hey ${addedBy}, Thank You for rising an issue!!`,
    });
  });
};

exports.listIssues = (__, res) => {
  Issue.find({}, { updatedAt: 0, __v: 0 }).exec((err, issues) => {
    if (err) {
      return res.status(400).json({ error: "Something went wrong!!" });
    }

    if (issues.length === 0) {
      return res.status(400).json({ message: "No Posts found" });
    }

    return res.json(issues);
  });
};

exports.updateIssue = (req, res) => {
  const { title, discription } = req.body;
  const _id = req.params.id;
  Issue.findOne({ _id }).exec((err, issue) => {
    if (err) {
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }

    if (!issue) {
      return res.status(401).json({
        error: "Issue with the given id does not exist!!",
      });
    }

    const updateFields = {
      issueTitle: title,
      issueDiscription: discription,
    };

    issue = _.extend(issue, updateFields);

    issue.save((err) => {
      console.log(err);
      if (err) {
        return res.status(400).json({
          error: "Something went wrong in saving the data",
        });
      }

      return res.json({
        message: "Issue has been updated",
      });
    });
  });
};

exports.deleteIssue = (req, res) => {
  const _id = req.params.id;

  Issue.deleteOne({ _id }).exec((err) => {
    if (err) {
      return res.status(400).json({
        error: "Error in deleting the issue",
      });
    }

    return res.json({
      message: "Issue sucessfully Deleted!!",
    });
  });
};
