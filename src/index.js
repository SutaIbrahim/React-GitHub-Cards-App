import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";


function Header(props) {
  return <div className="app-title">{props.title}</div>;
}

function SuggestedProfiles(props) {

  return <div>{props.profiles.map(profile => <SuggestedProfileItem key={profile.id} profile={profile} onClick={props.onClick} />)}</div>;
}

class SuggestedProfileItem extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <div className="github-profile" onClick={() => this.props.onClick(profile.id)} >
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="url">Profile api url:<br /> <a href={profile.url}>{profile.url}</a></div>
        </div>
      </div >
    );
  }
}

class Form extends React.Component {
  state = {
    username: '',
    suggestedProfiles: []
  };

  addNewSuggestedProfiles = (newSuggestedProfiles) => {
    this.setState(prevState => ({
      suggestedProfiles: newSuggestedProfiles,
    }));
  };

  addToSelectedProfiles = (profileId) => {
    alert(profileId);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/search/users?q=${this.state.username}`);
    this.addNewSuggestedProfiles(resp.data.items);
    this.setState({ username: '' });
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
        <SuggestedProfiles profiles={this.state.suggestedProfiles} onClick={this.addToSelectedProfiles} />
      </div >
    );
  }
}

class App extends React.Component {
  state = {
    selectedProfiles: []
  };

  render() {
    return (
      <div>
        <Header title={this.props.title} />,
        <Form />
      </div>
    )
  }
}


ReactDOM.render(
  <App title="My first React app" />,
  document.getElementById('root')
);


