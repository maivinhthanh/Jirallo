import React from "react";
import SearchDropdown from "./SearchDropdown";
import UserProfile from "./UserProfile";

export default class Topbar extends React.Component {
  render() {
    return (
      <div className="kt-header__topbar">
        <SearchDropdown useSVG="true" />

        <UserProfile showAvatar={true} showHi={true} showBadge={false} />
      </div>
    );
  }
}
