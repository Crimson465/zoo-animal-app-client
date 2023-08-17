import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);

    const user = {
      email: email,
      password: password
    };

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);

        if (data.message.toLowerCase() === 'success') {
          console.log(`data.token: ${data.token}`);
          localStorage.setItem("token", data.token);
          setLoginSuccess(true);
        }else{
          alert(data.message);
        }
      });
  };

  useEffect(() => {
    console.log(`Inside getEmail fetch\nloginSuccess: ${loginSuccess}`);
    console.log(`token: ${localStorage.getItem("token")}`);
    fetch("http://localhost:3001/getEmail", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(`data.isLoggedIn: ${data.isLoggedIn}`);
        if (data.isLoggedIn) {
          navigate("/home")
        }
      });
  }, [loginSuccess]);

  return (
    <div className='bg'>
      <div className='login-container'>
        <h2>Login Page</h2>
        <form onSubmit={event => handleSubmit(event)}>
          <div className='login-form'>
            <div>
              <label htmlFor="email">Email: </label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" name="email" id="email" required />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" name="password" id="password" required />
            </div>
            <div>
              <button type='submit'>Login</button>
            </div>
            <div>
              <Link to='/signup'>
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
