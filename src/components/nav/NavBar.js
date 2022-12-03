import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navImgContainer">
      <div className="navBarLinks">
        <div className="navbar__item active">
          <Link className="navbar__link" to="/staffUpcomingEvents">
            Home
          </Link>
        </div>
        <div className="navbar__item active">
          <Link className="navbar__link" to="/AboutUs">
            My Favorites
          </Link>
        </div>
        {localStorage.getItem("project_user") ? (
          <div className="navbar__item navbar__logout">
            <Link
              className="navbar__link"
              to=""
              onClick={() => {
                localStorage.removeItem("project_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};