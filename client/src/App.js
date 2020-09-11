import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "./components/Layout";
import IssuesList from "./components/IssuesList";
import AddIssue from "./components/AddIssue";
import NavigationBar from "./components/Navbar";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Layout>
          <Switch>
            <Route exact path="/" component={IssuesList} />
            <Route path="/add-issue" component={AddIssue} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
