import React from "react";

export const SelectedProfiles = (props) => {
  return (
    <div>
      {props.profiles.map((profile) => (
        <SelectedProfileItem
          key={profile.id}
          profile={profile}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};

class SelectedProfileItem extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <div className="github-profile-selected">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.login}</div>
          <span className="followers">
            <b>Followers: </b>
            {profile.followers}
          </span>
          &nbsp;
          <span className="following">
            <b>Following: </b>
            {profile.following}
          </span>
        </div>
        <button
          style={{ float: "top", marginTop: "15px" }}
          onClick={() => this.props.onClick(profile.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}
