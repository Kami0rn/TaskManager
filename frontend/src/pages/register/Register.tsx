import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserInterface } from "../../interfaces/Iuser";
import { CreateUser } from "../../services/http/user/user";

function Register() {
  const [inputs, setInputs] = useState<UserInterface>({
    PhoneNumber: 0, // or any default number value
  });
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs);

    try {
      const result = await CreateUser({
        UserName: inputs.UserName,
        Password: inputs.Password,
        FullName: inputs.FullName,
        Email: inputs.Email,
        Bio: inputs.Bio,
        ProfilePic: inputs.ProfilePic,
      });

      if (result && result.status === true) {
        MySwal.fire({
          html: <i>{result.message}</i>,
          icon: "success",
        }).then((value) => {
          navigate("/");
        });
      } else {
        const message =
          result && result.message ? result.message : "No result message";
        MySwal.fire({
          html: <i>{message}</i>,
          icon: "error",
        });
      }
    } catch (error) {
      MySwal.fire({
        html: <i>{String(error)}</i>,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Fname:
          <input
            type="text"
            name="UserName"
            value={inputs.UserName || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="Password"
            value={inputs.Password || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="FullName"
            value={inputs.FullName || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="Email"
            value={inputs.Email || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          PhoneNumber:
          <input
            type="number"
            name="PhoneNumber"
            value={inputs.PhoneNumber || 0}
            onChange={handleChange}
            required // Add the 'required' attribute
          />
        </label>
        <label>
          Bio:
          <input
            type="text"
            name="Bio"
            value={inputs.Bio || ""}
            onChange={handleChange}
          />
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}

export default Register;
