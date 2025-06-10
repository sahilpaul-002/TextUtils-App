import React, {useState} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default function Navbar(props) {
  const {title, mode, toggleMode} = props;// Destructuring props for mode and toggleMode

  const [isCollapsed, setIsCollapsed] = useState(true);// State for collapsable navbar

  // Logic to update the state for collapsable navbar
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${mode.theme} bg-${mode.theme}`}>
      <Link className="navbar-brand" to="/">
        {title}
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-controls="navbarSupportedContent"
        aria-expanded={!isCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`} id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
          <div className={`custom-control custom-switch ${mode.classNameAttribute} mx-5`}>
            <input
              type="checkbox"
              className="custom-control-input"
              id="modeSwitch"
              name="modeSwitch"
            />
            <label
              className="custom-control-label"
              htmlFor="modeSwitch"
              onClick={toggleMode}
            >
              {mode.text}
            </label>
          </div>
        </form>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired
}

Navbar.defaultProps = {
  title: 'Set Title Here'
}