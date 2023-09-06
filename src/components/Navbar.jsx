import ElementDropdown from "./ElementDropdown";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary m-auto">
      <div className="container-fluid">
        <a className="navbar-brand" href=".">
          Navbar
          {/* Set the logo */}
        </a>

        {/* Toogle buttom in small display*/}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="."
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Types
              </a>
              {/* Elements in the dropdown */}
              <ElementDropdown />
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Name or id"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
