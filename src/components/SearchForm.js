import React from "react";
import axios from "axios";

import { SuggestedProfiles } from "./SuggestedProfiles";

class Form extends React.Component {
  state = {
    username: "",
    suggestedProfiles: []
  };

  addNewSuggestedProfiles = newSuggestedProfiles => {
    this.setState(prevState => ({
      suggestedProfiles: newSuggestedProfiles
    }));
  };

  handleAddToSelectedProfiles = async profileId => {
    //var profile = this.state.suggestedProfiles.filter(x => x.id == profileId);
    const resp = await axios.get(`https://api.github.com/user/${profileId}`);
    this.props.addToSelectedProfiles(resp.data);

    this.setState(prevState => ({
      suggestedProfiles: prevState.suggestedProfiles.filter(
        x => x.id != profileId
      )
    }));
  };

  handleSubmit = async event => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/search/users?q=${this.state.username}`
    );
    this.addNewSuggestedProfiles(resp.data.items);
    this.setState({ username: "" });
  };

  render() {
    return (
      <div className="app-form">
        <form onSubmit={this.handleSubmit} style={{ marginBottom: "50px" }}>
          <input
            className="searchInput"
            type="text"
            placeholder="Enter a GitHub username"
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            required
          />
          <button className="searchBtn">Search</button>
        </form>
        <SuggestedProfiles
          profiles={this.state.suggestedProfiles}
          onClick={this.handleAddToSelectedProfiles}
        />
      </div>
    );
  }
}

export default Form;
