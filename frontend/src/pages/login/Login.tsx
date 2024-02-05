import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "./Login.module.css"; // Import CSS module

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
      expiresIn: 6000000000000000000000000000,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8081/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result); // Log the entire response
        if (result.status === "ok") {
          const { token } = result;
          const { userId } = result;  // Access token directly from result
          console.log(token); // Verify token exists in the response
          localStorage.setItem("token", token); 
          localStorage.setItem("userId", userId);// Store the token in local storage
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
    <div className={styles.wrapper}> {/* Use CSS module classes */}
      <div className={styles.login_box}>
        <form onSubmit={handleSubmit}>
          <div className={styles["login-header"]}>
            <span>Login</span>
          </div>

          <div className={styles.input_box}>
            <input
              type="text"
              id="user"
              className={styles["input-field"]}
              name="username"
              value={inputs.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="user" className={styles.label}>
              Username
            </label>
            <i className={`bx bx-user ${styles.icon}`}></i>
          </div>

          <div className={styles.input_box}>
            <input
              type="password"
              id="pass"
              className={styles["input-field"]}
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="pass" className={styles.label}>
              Password
            </label>
            <i className={`bx bx-lock-alt ${styles.icon}`}></i>
          </div>

          {/* Other JSX elements with updated classNames */}

          <div className={styles.input_box}>
            <input type="submit" className={styles["input-submit"]} value="Login" />
          </div>
          <div className={styles.register}>
            <span>
              Don't have an account?   <a href="/register">  Register  </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
