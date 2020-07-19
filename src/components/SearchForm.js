import React from "react";
import axios from "axios";

import { SuggestedProfiles } from "./SuggestedProfiles";

class Form extends React.Component {
  state = {
    username: "",
    liveSearch: false,
    timeout: 0,
    suggestedProfiles: [],
    customMessage: "",
  };

  setCustomMessage = (message = "") => {
    this.setState(() => ({
      suggestedProfiles: [],
      customMessage: message,
    }));
  };

  addNewSuggestedProfiles = (newSuggestedProfiles) => {
    this.setState(() => ({
      suggestedProfiles: newSuggestedProfiles,
    }));
  };

  handleAddToSelectedProfiles = async (profileId) => {
    //var profile = this.state.suggestedProfiles.filter(x => x.id == profileId);
    const resp = await axios.get(`https://api.github.com/user/${profileId}`);
    this.props.addToSelectedProfiles(resp.data);

    this.setState((prevState) => ({
      suggestedProfiles: prevState.suggestedProfiles.filter(
        (x) => x.id != profileId
      ),
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setCustomMessage("Loading...");

    setTimeout(() => {
      this.searchForProfiles();
    }, 1200);
  };

  searchForProfiles = async () => {
    if (this.state.username.length > 0) {
      const resp = await axios.get(
        `https://api.github.com/search/users?q=${this.state.username}`
      );
      this.addNewSuggestedProfiles(resp.data.items);
      this.setState(() => ({
        customMessage: resp.data.items.length > 0 ? "" : "No results",
      }));
      //this.setState({ username: "" });
    } else {
      this.setCustomMessage();
    }
  };

  handleInputOnChange(event) {
    this.setState({ username: event.target.value });

    if (this.state.liveSearch) {
      clearTimeout(this.timeout);
      this.setCustomMessage("Loading...");
      this.timeout = setTimeout(() => {
        this.searchForProfiles();
      }, 400);
    }
  }

  render() {
    var customMessageElement;

    if (this.state.customMessage.length > 0) {
      customMessageElement = (
        <div style={{ margin: "100px", fontSize: "18px", fontWeight: "500" }}>
          {this.state.customMessage}
        </div>
      );
    }

    return (
      <div className="app-form">
        <form
          onSubmit={this.handleSubmit}
          style={{
            marginBottom:
              this.state.suggestedProfiles.length > 0 ? "50px" : "initial",
          }}
        >
          <input
            className="searchInput"
            type="text"
            placeholder="Enter a GitHub username"
            value={this.state.username}
            onChange={(event) => this.handleInputOnChange(event)}
            required
          />
          <button className="searchBtn" disabled={this.state.liveSearch}>
            Search
          </button>
          <input
            type="checkbox"
            onChange={(event) =>
              this.setState({ liveSearch: event.target.checked })
            }
          ></input>
          Live search
        </form>
        {customMessageElement}
        <SuggestedProfiles
          profiles={this.state.suggestedProfiles}
          onClick={this.handleAddToSelectedProfiles}
        />
      </div>
    );
  }
}

export default Form;
