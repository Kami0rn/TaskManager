import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Login.css"; // Replace 'styles.css' with your CSS file path

interface Inputs {
  username: string;
  password: string;
}

function Login(): JSX.Element {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [inputs, setInputs] = useState<Inputs>({ username: "", password: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: inputs.username,
      password: inputs.password,
      expiresIn: 600000,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result); // Log the entire response
        if (result.status === "ok") {
          const { token } = result; // Access token directly from result
          console.log(token); // Verify token exists in the response
          localStorage.setItem("token", token); // Store the token in local storage
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
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log("Error during login:", error); // Log any fetch or parsing errors
        // Handle the error appropriately (display an error message, etc.)
      });
  };

  return (
    <div className="wrapper">
      <div className="login_box">
        <form onSubmit={handleSubmit}>
          <div className="login-header">
            <span>Login</span>
          </div>

          <div className="input_box">
            <input
              type="text"
              id="user"
              className="input-field"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="user" className="label">
              Username
            </label>
            <i className="bx bx-user icon"></i>
          </div>

          <div className="input_box">
            <input
              type="password"
              id="pass"
              className="input-field"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="pass" className="label">
              Password
            </label>
            <i className="bx bx-lock-alt icon"></i>
          </div>

          <div className="remember-forgot">
            <div className="forgot">
              <a href="#">Forgot password?</a>
            </div>
          </div>

          <div className="input_box">
            <input
              type="submit"
              className="input-submit"
              value="Login"
            />
          </div>
          <div className="register">
            <span>
              Don't have an account? <a href="#">Register</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
