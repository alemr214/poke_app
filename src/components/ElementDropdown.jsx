import React, { useState, useEffect } from "react";
function ElementDropdown() {
  return (
    <ul className="dropdown-menu">
      <li>
        <a className="dropdown-item" href="#">
          Action
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="#">
          Another action
        </a>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <a className="dropdown-item" href="#">
          Something else here
        </a>
      </li>
    </ul>
  );
}

export default ElementDropdown;
