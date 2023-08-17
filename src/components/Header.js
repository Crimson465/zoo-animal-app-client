import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <header>
      <h1 className="banner" id="header">My Zoo</h1>
      <Link to='/create-animal'>
        <button className="create-btn">Create</button>
      </Link>
      <Link to='/delete-animal'>
        <button className="delete-btn">Delete</button>
      </Link>
      <Link to='/full-list'>
        <button className="full-btn">Full List</button>
      </Link>
      <button className="logout-btn" onClick={(event) => handleLogout(event)}>Logout</button>
      <div className="list">
        <h2>My Animals</h2>
        <ul id="dynamic-list"></ul>
      </div>
    </header>

  )
}

export default Header
