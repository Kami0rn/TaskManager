import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { CreateDeadline } from "../../../services/http/deadline/deadline";
import Swal from "sweetalert2";

function CreateDeadlineForm() {
  const cardID = Number(localStorage.getItem("cardIDForMenu")); // Convert to number
  const initialFormData = {
    calendarID: 1,
    deadlineName: "",
    description: "",
    cardID: cardID,
    startDate: new Date(),
    endDate: new Date(),
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "startDate" || name === "endDate" ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const formattedFormData = {
      ...formData,
    };

    const created = await CreateDeadline(formattedFormData);

    if (created) {
      console.log("Deadline created successfully:", created);
      Swal.fire({
        icon: "success",
        title: "Card Updated!",
        text: "The deadline has been created successfully.",
      }).then(() => {
        window.location.reload();
      });
    } else {
      console.error("Failed to create deadline");
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to create the deadline. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Deadline Name:
        <input
          type="text"
          name="deadlineName"
          value={formData.deadlineName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Start Date:
        <input
          type="datetime-local"
          name="startDate"
          value={formData.startDate.toISOString().slice(0, -8)}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        End Date:
        <input
          type="datetime-local"
          name="endDate"
          value={formData.endDate.toISOString().slice(0, -8)}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Create Deadline</button>
    </form>
  );
}

export default CreateDeadlineForm;
