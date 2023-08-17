import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Signup() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`firstname: ${first_name}`);
    console.log(`lastname: ${last_name}`);
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);

    const user = { first_name, last_name, email, password };
    console.log(user);

    const result = axios.post('http://localhost:3001/users',
      user, {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    });

    result.then((data) => {
      // console.log(`data: ${data.data.message}`);

      if (data.data.message) {
        alert('Email already in use');
      } else {
        navigate('/login');
      }
    });
  };

  return (
    <div className='bg'>
      <div className="signup-container">
        <h2>Sign-Up Page</h2>
        <form onSubmit={handleSubmit}>
          <div className='signup-form'>
            <div>
              <label htmlFor="firstname">First Name: </label>
              <input value={first_name} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Enter First Name" name="firstname" id="firstname" required />
            </div>
            <div>
              <label htmlFor="lastname">Last Name: </label>
              <input value={last_name} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Enter Last Name" name="lastname" id="lastname" required />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" name="email" id="email" required />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" name="password" id="password" required />
            </div>
            <div>
              {/* <Link to='/login'> */}
              <button type='submit'>Sign Up</button>
              {/* </Link> */}
            </div>
            <div>
              <Link to='/login'>
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
