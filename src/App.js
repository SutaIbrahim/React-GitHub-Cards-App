import React from "react";
import logo from "./logo.svg";
import "./App.scss";

import Form from "./components/SearchForm.js";
import { SelectedProfiles } from "./components/SelectedProfiles.js";
import { Simulate } from "react-dom/test-utils";
import swal from "sweetalert";

function Title(props) {
  return <div className="app-title">{props.title}</div>;
}

class App extends React.Component {
  state = {
    selectedProfiles: [],
  };

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
        });
      } else {
        swal("You did not delete this profile :)");
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
      </div>
    );
  }
}

export default App;
