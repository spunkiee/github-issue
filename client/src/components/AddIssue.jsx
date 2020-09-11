import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import addIssueImage from "../assets/add-issue.svg";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#41444b",
      fontWeight: "bold",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#BCBDC0",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fddb3a",
      },
    },
  },
})(TextField);

export default function AddIssue() {
  const classes = useStyles();

  const [formInputs, setFormInputs] = useState({
    addedBy: "",
    email: "",
    issueTitle: "",
    issueDiscription: "",
    buttonText: "Submit",
  });

  const {
    buttonText,
    addedBy,
    email,
    issueTitle,
    issueDiscription,
  } = formInputs;

  const handleChange = (evt) => {
    setFormInputs({
      ...formInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (addedBy && email && issueTitle && issueDiscription) {
      setFormInputs({ ...formInputs, buttonText: "Submitting..." });

      axios
        .post("/add-issue", {
          addedBy,
          email,
          issueTitle,
          issueDiscription,
        })
        .then((res) => {
          setFormInputs({
            addedBy: "",
            issueTitle: "",
            email: "",
            issueDiscription: "",
            buttonText: "Submit",
          });

          toast.success(res.data.message);
        })
        .catch((err) => {
          if (err && err.response && err.response.data) {
            toast.error(err.response.data.error);
          }

          setFormInputs({
            ...formInputs,
            buttonText: "Submit",
          });
        });
    } else {
      toast.error("All fields required");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="issue-heading">ADD A ISSUE</div>
      <div className="add-issue-container">
        <div className="form-image-container">
          <img src={addIssueImage} alt="Find Bug" />
        </div>
        <div className="form-container">
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CssTextField
                  name="addedBy"
                  variant="outlined"
                  required
                  fullWidth
                  label="Issue Added By"
                  autoFocus
                  onChange={handleChange}
                  value={addedBy}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Your Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  required
                  fullWidth
                  name="issueTitle"
                  label="Issue Title"
                  onChange={handleChange}
                  value={issueTitle}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  name="issueDiscription"
                  required
                  fullWidth
                  label="Issue Discription"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={handleChange}
                  value={issueDiscription}
                />
              </Grid>
            </Grid>
            <Button
              style={{
                backgroundColor: "#343A40",
                padding: "10px 36px",
                fontWeight: "bold",
                color: "#fddb3a",
              }}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
