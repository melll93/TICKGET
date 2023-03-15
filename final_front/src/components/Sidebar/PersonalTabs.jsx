import React from "react";
import { Link } from "react-router-dom";

const PersonalTabs = () => {
  return (
    <div className="PersonalTabs">
      <div className="PersonalTabs tab">
        <Link to="/cart">
          <img className="image20" src="logos/CART.png" />
        </Link>
      </div>
      <div className="PersonalTabs tab">
        <Link to="/ticket">
          <img className="image20" src="logos/TICKET.png" />
        </Link>
      </div>
      <div className="PersonalTabs tab">
        <Link to="/bookmark">
          <img className="image20" src="logos/BOOKMARK.png" />
        </Link>
      </div>
      <div className="PersonalTabs tab">
        <Link to="/setting">
          <img className="image20" src="logos/SETTING.png" />
        </Link>
      </div>
    </div>
  );
};

export default PersonalTabs;
