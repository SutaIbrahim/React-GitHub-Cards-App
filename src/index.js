import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
//import App from './App';
import * as serviceWorker from "./serviceWorker";

import Form from "./components/SearchForm.js";
import { SelectedProfiles } from "./components/SelectedProfiles.js";

function Header(props) {
  return <div className="app-title">{props.title}</div>;
}

class App extends React.Component {
  state = {
    selectedProfiles: []
  };

  addToSelectedProfiles = selectedProfile => {
    this.setState(prevState => ({
      selectedProfiles: [...prevState.selectedProfiles, selectedProfile]
    }));
  };

  render() {
    return (
      <div>
        <Header title={this.props.title} />,
        <Form addToSelectedProfiles={this.addToSelectedProfiles} />
        <div className="selected-profiles-wrapper">
          <SelectedProfiles profiles={this.state.selectedProfiles} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App title="My first React app" />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
