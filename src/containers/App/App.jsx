import "./App.scss";

import { createBrowserHistory } from "history";
import React, { useState } from "react";
import { Route, Router, Switch } from "react-router-dom";

import { NotFound, UserList } from "..";
import { Header, Panel } from "../../components";
import { AddUser } from "../users";


const history = createBrowserHistory();

export function App() {

  const [notif, setNotif] = useState(null);

  const showNotif = (message) => {
    setNotif(message);
    setTimeout(() => {
      setNotif(null);
    }, 5000);
  }

  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <section className="body">
          <Panel className="wrapper">
            <Switch>
              <Route exact path="/" component={UserList} />
              <Route exact path="/Add" component={() => <AddUser showNotif={showNotif} />} />
              <Route component={NotFound} />
            </Switch>
          </Panel>
        </section>
      </Router>
      {notif && <div className="notif">{notif}</div>}
    </div>
  );
}

