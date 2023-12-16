import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface Inputs {
  username: string;
  password: string;
}

function Login(): JSX.Element {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [inputs, setInputs] = useState<Inputs>({ username: '', password: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      username: inputs.username,
      password: inputs.password,
      expiresIn: 600000,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:8080/login', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result); // Log the entire response
        if (result.status === 'ok') {
          const { token } = result; // Access token directly from result
          console.log(token); // Verify token exists in the response
          localStorage.setItem('token', token); // Store the token in local storage
          // navigate('/profile'); // Redirect to profile page on successful login
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "success",
          }).then((value) => {
            navigate("/profile");
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error',
          });
        }
      })
      .catch(error => {
        console.log('Error during login:', error); // Log any fetch or parsing errors
        // Handle the error appropriately (display an error message, etc.)
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      <a href="/register">Register!!</a>
    </div>
  );
}

export default Login;