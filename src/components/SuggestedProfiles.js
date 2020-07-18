import React from "react";

export const SuggestedProfiles = (props) => {
  return (
    <div>
      {props.profiles.map((profile) => (
        <SuggestedProfileItem
          key={profile.id}
          profile={profile}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};

class SuggestedProfileItem extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <div
        className="github-profile"
        onClick={() => this.props.onClick(profile.id)}
        title="Click to add"
      >
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="url">
            Api url:
            <br /> <a href={profile.url}>{profile.url}</a>
          </div>
        </div>
      </div>
    );
  }
}
