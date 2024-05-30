// src/Sidebar.js

import { Nav } from 'react-bootstrap';
import '../style/Sidebar.css'; // Import custom CSS for additional styling
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar margin-top">
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/home">Home</Nav.Link>
        <Nav.Link as={Link} to="/user">User</Nav.Link>
        <Nav.Link as={Link} to="/roles">Roles</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
