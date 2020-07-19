import React, { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.scss";

import Form from "./components/SearchForm.js";
import { SelectedProfiles } from "./components/SelectedProfiles.js";
import swal from "sweetalert";

function Title(props) {
  return <div className="app-title">{props.title}</div>;
}

class App extends React.Component {
  state = {
    selectedProfiles: JSON.parse(localStorage.getItem("selectedProfiles")),
  };

  // only for test
  componentDidMount() {
    document.title = `You have ${this.state.selectedProfiles.length} profiles`;
  }
  componentDidUpdate() {
    document.title = `You have ${this.state.selectedProfiles.length} profiles`;
  }

  updateLocalStorage() {
    localStorage.setItem(
      "selectedProfiles",
      JSON.stringify(this.state.selectedProfiles)
    );
  }

  addToSelectedProfiles = (selectedProfile) => {
    if (
      this.state.selectedProfiles.filter((x) => x.id == selectedProfile.id)
        .length > 0
    ) {
      swal("This profile is already selected :)");
    } else {
      this.setState((prevState) => ({
        selectedProfiles: [...prevState.selectedProfiles, selectedProfile],
      }));
    }

    this.updateLocalStorage();
  };

  deleteProfile = (profileId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will be able to add again this profile",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.setState((prevState) => ({
          selectedProfiles: prevState.selectedProfiles.filter(
            (x) => x.id != profileId
          ),
        }));
        swal("Poof! Profile was deleted", {
          icon: "success",
          timer: 1500,
          buttons: false,
        });
        this.updateLocalStorage();
      } else {
        swal("You did not delete this profile :)", {
          icon: "info",
          timer: 1500,
          buttons: false,
        });
      }
    });
  };

  render() {
    let selectedProfilesWrapper;

    if (this.state.selectedProfiles.length > 0) {
      selectedProfilesWrapper = (
        <div className="selected-profiles-wrapper">
          <SelectedProfiles
            profiles={this.state.selectedProfiles}
            onClick={this.deleteProfile}
          />
        </div>
      );
    } else {
      selectedProfilesWrapper = (
        <div style={{ margin: "100px", color: "white", fontSize: "30px" }}>
          You have not selected any GitHub profile
        </div>
      );
    }

    return (
      <div className="App">
        <Title title={this.props.title} />,
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Form addToSelectedProfiles={this.addToSelectedProfiles} />
        {selectedProfilesWrapper}
        <div
          style={{
            color: "whitesmoke",
            position: "absolute",
            bottom: "20px",
            right: "30px",
          }}
        >
          Ibrahim Šuta
        </div>
      </div>
    );
  }
}

export default App;
