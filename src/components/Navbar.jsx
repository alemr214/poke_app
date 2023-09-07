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
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Name or id"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
